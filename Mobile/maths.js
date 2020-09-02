const gcd = (a, b) => a ? gcd(b % a, a) : b; // Greatest common divisor

const lcm = (a, b) => a * b / gcd(a, b); // Lowest common multiple

[11,20,15].reduce(lcm);