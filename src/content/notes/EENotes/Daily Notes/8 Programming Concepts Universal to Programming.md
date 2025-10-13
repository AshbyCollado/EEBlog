
According to [Andy Harris](https://www.youtube.com/watch?v=azcrPFhaY9k), There are 7-8 main concepts universal to programming languages
	The seven big ideas in computer programming: 1. Variables / Data 2. Input / Output 3. Operations 4. Branching 5. Loops 6. Functions 7. Aggregate data Understanding these ideas gives you the ability to create algorithms, which is the foundation of all programming in any language

With ChatGPT's assistance, I've gotten some confirmation.

### Programming Concepts

- **Variables**: Storing and managing data.
- **Data Types**: Understanding different types of data like integers, strings, and arrays.
- **Conditionals**: Making decisions in code using if-else statements.
- **Loops**: Repeating code with for and while loops.
- **Functions**: Encapsulating reusable blocks of code.
- **Arrays**: Storing collections of data.
- **Objects**: Using object-oriented programming to model real-world entities.
- **Classes**: Defining blueprints for objects in OOP.

##### In-depth

**Variables**:

- **Definition**: Variables are storage locations in memory with a name, used to store data that can be changed during program execution.
	**Example**: `int age = 30;` stores the integer value `30` in a variable named `age`.

**Data Types**:

- **Definition**: Data types specify the type of data that a variable can hold, such as integers, floating-point numbers, characters, strings, and booleans.
	**Example**: `string name = "Alice";` declares a variable `name` of type `string`.

**Conditionals**:

- **Definition**: Conditional statements allow programs to make decisions based on certain conditions, typically using `if`, `else if`, and `else`.
	**Example**: 
```csharp
	if (score > 90) {
    grade = 'A';
} else if (score > 80) {
    grade = 'B';
} else {
    grade = 'C';
}
```

**Loops**:

- **Definition**: Loops enable repeated execution of a block of code as long as a specified condition is true. Common types include `for`, `while`, and `do-while` loops.
	**Example**:
```csharp
	for (int i = 0; i < 10; i++) {
    cout << i;
}
```

**Functions**:

- **Definition**: Functions are blocks of code designed to perform a specific task, which can be reused throughout the program.
	**Example**:
```csharp
	int add(int a, int b) {
    return a + b;
}
```

**Arrays**:

- **Definition**: Arrays are collections of elements, typically of the same data type, stored at contiguous memory locations.
	**Example**:
```csharp
	int numbers[5] = {1, 2, 3, 4, 5};
```

**Objects**:

- **Definition**: Objects are instances of classes in object-oriented programming, encapsulating data and functions that operate on the data.
	**Example**:
```csharp
	class Car {
    public:
        string brand;
        string model;
        int year;
};
Car myCar;
```

**Classes**:

- **Definition**: Classes define the structure and behavior (data members and methods) that the objects created from the class can have.
	**Example**:
```csharp
	class Car {
    public:
        string brand;
        string model;
        int year;
        void display() {
            cout << brand << " " << model << " " << year;
        }
};
```

Once mastered, every programming language is nothing but a tool.

