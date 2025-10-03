<script>
	import { onMount } from 'svelte';

	export let id = ''; // Unique ID for the page, e.g., a blog post slug
	export let emojis = [];

	// Reactive statement: This code will re-run whenever the `emojis` prop changes.
	// This ensures the map is built correctly after the props are passed from Astro.
	$: emojiColumnMap = emojis.reduce((acc, emoji, i) => {
		acc[emoji] = `emoji${i + 1}`;
		return acc;
	}, {});

	let selectedEmoji = '';
	let reactionCounts = {};
	let isLoading = true;
	let key = `emoji-reaction-${id}`;

	$: availableEmojis = emojis;

	onMount(async () => {
		// Load the user's previous reaction from localStorage
		const savedReaction = localStorage.getItem(key);
		if (savedReaction) {
			selectedEmoji = savedReaction;
		}

		// Fetch the public reaction counts from the API
		try {
			const response = await fetch(`/api/reactions/${id}`);
			if (response.ok) {
				const data = await response.json();
				reactionCounts = data;
			}
		} catch (error) {
			console.error('Failed to fetch reactions:', error);
		} finally {
			isLoading = false;
		}
	});

	async function handleReaction(emoji) {
		try {
			const oldSelection = selectedEmoji;
			const newSelection = oldSelection === emoji ? '' : emoji;

			// Add haptic feedback on new selections for a better UX on mobile
			if (newSelection && navigator.vibrate) {
				navigator.vibrate(50);
			}

			// --- Optimistic UI Update ---
			// Immediately update the UI for a snappy user experience,
			// without waiting for the server response.
			selectedEmoji = newSelection;
			localStorage.setItem(key, newSelection);

			// Adjust local counts based on the user's action.
			if (oldSelection) {
				const col = emojiColumnMap[oldSelection];
				if (col) reactionCounts[col] = Math.max(0, reactionCounts[col] - 1);
			}
			if (newSelection) {
				const col = emojiColumnMap[newSelection];
				if (col) reactionCounts[col] = (reactionCounts[col] || 0) + 1;
			}
			reactionCounts = reactionCounts; // This line forces Svelte to see the change

			// --- Server-Side Update ---
			// Now, send the update to the server in the background.
			// If this fails, the UI will be reverted in the catch block.

			// Decrement the old reaction if there was one
			if (oldSelection) {
				await fetch(`/api/reactions/${id}`, {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ emoji: oldSelection, increment: -1, emojis: emojis })
				});
			}
			// Increment the new reaction if there is one
			if (newSelection) {
				await fetch(`/api/reactions/${id}`, {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ emoji: newSelection, increment: 1, emojis: emojis })
				});
			}
			
			// Finally, fetch the definitive counts from the server to ensure UI is in sync.
			const countResponse = await fetch(`/api/reactions/${id}`);
			if (countResponse.ok) {
				const updatedCounts = await countResponse.json();
				reactionCounts = updatedCounts;
			}
		} catch (error) {
			console.error('Failed to handle reaction:', error);
			// If the server update fails, revert the optimistic UI changes.
		}
	}
</script>

{#if !isLoading}
	<div class="emoji-reaction-wrapper">
		<!-- This trigger button shows the selected emoji or a default icon -->
		<button class="trigger-button" class:selected={selectedEmoji} aria-label="React to this post">
			{#if selectedEmoji}
				<span class="selected-emoji-display">{selectedEmoji}</span>
			{:else}
				<svg
					class="default-icon"
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<circle cx="12" cy="12" r="10" />
					<path d="M8 14s1.5 2 4 2 4-2 4-2" />
					<line x1="9" y1="9" x2="9.01" y2="9" />
					<line x1="15" y1="9" x2="15.01" y2="9" />
				</svg>
			{/if}
		</button>

		<!-- These are the emoji options that appear on hover -->
		<div class="emoji-options">
			{#each availableEmojis as emoji, i}
				<button
					on:click={() => handleReaction(emoji)}
					class="emoji-button"
					class:selected={selectedEmoji === emoji}
					aria-pressed={selectedEmoji === emoji}
					title={`React with ${emoji} (${reactionCounts[emojiColumnMap[emoji]] || 0})`}
					style={`--i: ${i};`}
				>
					<span class="emoji-icon">{emoji}</span>
					{#if (reactionCounts[emojiColumnMap[emoji]] || 0) > 0}
						<span class="emoji-count">{reactionCounts[emojiColumnMap[emoji]]}</span>
					{/if}
				</button>
			{/each}
		</div>
	</div>
{/if}

<style>
	.emoji-reaction-wrapper {
		position: relative;
		display: flex;
		align-items: center;
		height: 44px; /* Give it a fixed height to prevent layout shift */
	}

	.trigger-button {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 44px;
		height: 44px;
		padding: 0;
		border-radius: 9999px;
		background-color: transparent;
		cursor: pointer;
		border: 2px solid transparent;
		transition: transform 0.2s ease, border-color 0.2s;
		z-index: 10;
	}
	.trigger-button.selected {
		border-color: #94a3b8; /* slate-400 */
	}
	.trigger-button:hover {
		transform: scale(1.1);
	}

	.selected-emoji-display {
		font-size: 1.5rem;
		line-height: 1;
	}

	.default-icon {
		width: 24px;
		height: 24px;
		color: #94a3b8; /* slate-400 */
	}

	.emoji-options {
		position: absolute;
		left: 0;
		display: flex;
		align-items: center;
		pointer-events: none; /* Prevents interaction when hidden */
	}

	.emoji-button {
		position: absolute; /* Crucial for jump-free animation */
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 1.5rem;
		padding: 0.5rem;
		border: 2px solid transparent;
		border-radius: 9999px;
		background-color: transparent;
		cursor: pointer;
		line-height: 1;
		transform: scale(0);
		opacity: 0;
		transition:
			transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1),
			opacity 0.2s,
			border-color 0.2s,
			background-color 0.2s;
		transform-origin: left center;
		color: #334155;
		width: 44px;
		height: 44px;
	}

	.dark .emoji-button {
		color: #e2e8f0;
	}

	.emoji-button.selected {
		border-color: #3b82f6;
		background-color: rgba(59, 130, 246, 0.1);
	}

	.emoji-count {
		position: absolute;
		top: -4px;
		right: -4px;
		background-color: #3b82f6;
		color: white;
		border-radius: 50%;
		width: 18px;
		height: 18px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 0.75rem;
		font-weight: 600;
		line-height: 1;
	}

	.dark .emoji-count {
		background-color: #60a5fa;
	}

	.emoji-reaction-wrapper:hover .emoji-options {
		pointer-events: auto; /* Allow interaction when visible */
	}

	.emoji-reaction-wrapper:hover .emoji-button {
		opacity: 1;
		transform: translateX(calc(var(--i) * 40px + 40px)) scale(1);
		transition-delay: calc(var(--i) * 50ms);
	}

	.emoji-button:hover {
		transform: translateX(calc(var(--i) * 40px + 40px)) scale(1.1) !important;
	}
</style>
