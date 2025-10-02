import type { APIRoute } from 'astro';
import { supabase } from '../../../lib/supabase';

export const prerender = false;

// Default map for posts that don't have custom emojis defined in their frontmatter.
const defaultEmojiColumnMap = {
    '👍': 'emoji1',
    '❤': 'emoji2',
    '🎉': 'emoji3',
    '🤔': 'emoji4',
    '😂': 'emoji5'
};

export const GET: APIRoute = async ({ params }) => {
    const { slug } = params;

    if (!slug) {
        return new Response('Slug is required', { status: 400 });
    }

    // First, try to get the reactions for the given slug
    let { data: reactions, error } = await supabase
        .from('reactions')
        .select('*')
        .eq('slug', slug)
        .single();

    // If there's an error and it's because the row doesn't exist, create it
    if (error && error.code === 'PGRST116') {
        const newReactionRow = {
            slug,
            ...Object.fromEntries(Object.values(defaultEmojiColumnMap).map((col) => [col, 0]))
        };

        const { data, error: insertError } = await supabase
            .from('reactions')
            .insert(newReactionRow)
            .select()
            .single();

        if (insertError) {
            return new Response(insertError.message, { status: 500 });
        }
        reactions = data;
    } else if (error) {
        return new Response(error.message, { status: 500 });
    }

    return new Response(JSON.stringify(reactions), {
        status: 200,
        headers: {
            'Content-Type': 'application/json'
        }
    });
};

export const POST: APIRoute = async ({ params, request }) => {
    const { slug } = params;
    const { emoji, increment, emojis } = await request.json();

    if (!slug) {
        return new Response('Slug is required', { status: 400 });
    }
    if (!emoji || increment === undefined) {
        return new Response('Emoji and increment value are required', { status: 400 });
    }

    let emojiColumnMap;
    if (emojis && Array.isArray(emojis) && emojis.length === 5) {
        emojiColumnMap = {};
        emojis.forEach((e, i) => {
            emojiColumnMap[e] = `emoji${i + 1}`;
        });
    } else {
        emojiColumnMap = defaultEmojiColumnMap;
    }

    const columnName = emojiColumnMap[emoji.includes('❤') ? '❤' : emoji];
    if (!columnName) {
        // If the emoji is not in the map, try a normalized lookup for the heart emoji
        const normalizedEmoji = emoji.includes('❤') ? '❤' : emoji;
        if (emojiColumnMap[normalizedEmoji]) {
            const normalizedColumn = emojiColumnMap[normalizedEmoji];
            const { error } = await supabase.rpc('increment_reaction', {
                slug_text: slug,
                column_name: normalizedColumn,
                increment_value: increment
            });
            if (error) return new Response(error.message, { status: 500 });
            return new Response('Reaction updated', { status: 200 });
        }
        return new Response('Invalid emoji', { status: 400 });
    }

    const { error } = await supabase.rpc('increment_reaction', {
        slug_text: slug,
        column_name: columnName,
        increment_value: increment
    });

    if (error) {
        return new Response(error.message, { status: 500 });
    }

    return new Response('Reaction updated', { status: 200 });
};
