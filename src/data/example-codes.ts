import { LanguageName } from "@uiw/codemirror-extensions-langs";

export const exmapleCodes: { lang: LanguageName; code: string }[] = [
  {
    lang: "python",
    code: `
# Calculate the square of a number
def square(x):
    return x * x

result = square(5)
print(result)
    `,
  },
  {
    lang: "javascript",
    code: `
// Check if a number is even or odd
let num = 7;
if (num % 2 === 0) {
    console.log("Even");
} else {
    console.log("Odd");
}
    `,
  },
  {
    lang: "java",
    code: `
// Find the maximum of two numbers
int a = 10, b = 15;
int max = Math.max(a, b);
System.out.println("Maximum: " + max);
    `,
  },
  {
    lang: "cpp",
    code: `
// Swap two variables
#include <iostream>
using namespace std;

int main() {
    int x = 5, y = 10;
    swap(x, y);
    cout << "Swapped: " << x << ", " << y << endl;
    return 0;
}
    `,
  },
  {
    lang: "ruby",
    code: `
# Concatenate strings
str1 = "Hello, "
str2 = "World!"
result = str1 + str2
puts result
    `,
  },
  {
    lang: "swift",
    code: `
// Calculate the average of an array of numbers
let numbers = [4, 7, 2, 9, 5]
let average = Double(numbers.reduce(0, +)) / Double(numbers.count)
print("Average: \(average)")
    `,
  },
  {
    lang: "go",
    code: `
    // Check if a number is positive, negative, or zero
    num := -3
    switch {
    case num > 0:
        fmt.Println("Positive")
    case num < 0:
        fmt.Println("Negative")
    default:
        fmt.Println("Zero")
    }
    `,
  },
  {
    lang: "csharp",
    code: `
// Display current date and time
DateTime now = DateTime.Now;
Console.WriteLine("Current Date and Time: " + now);
    `,
  },
  {
    lang: "php",
    code: `
<!DOCTYPE html>
<html>
<body>

<?php
$x = 5;
$y = 10;

function myTest() {
  $GLOBALS['y'] = $GLOBALS['x'] + $GLOBALS['y'];
} 

myTest();
echo $y;
?>

</body>
</html>
    `,
  },
  {
    lang: "rust",
    code: `
// Calculate the factorial of a number
fn factorial(n: u64) -> u64 {
    if n <= 1 {
        return 1;
    }
    n * factorial(n - 1)
}

let result = factorial(5);
println!("Factorial: {}", result);
    `,
  },
];
