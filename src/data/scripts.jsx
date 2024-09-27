const scripts = {
  Greetings: `
      function greet(name,surname) {
        return \`Hi \${name} \${surname}!\`;
      }
      console.log(greet('Mario','Rossi'));
    `,

  Sum: `
      const sum = 5 + 3;
      console.log('Sum  5 + 3 is:', sum);
    `,

  "For cycle": `
      for (let i = 0; i < 3; i++) {
        console.log(\`Iteration number: \${i + 1}\`);
      }
    `,

  Countdown: `
      let count = 5;
      while (count > 0) {
        console.log(\`Countdown: \${count}\`);
        count--;
      }
      console.log('Start!');
    `,

  "Even Numbers": `
      const even = [];
      for (let i = 1; i <= 10; i++) {
        if (i % 2 === 0) {
          even.push(i);
        }
      }
      console.log('Even numbers da 1 a 10:', even.join(', '));
    `,

  "Odd Numbers": `
      const odd = [];
      for (let i = 1; i <= 10; i++) {
        if (i % 2 !== 0) {
          odd.push(i);
        }
      }
      console.log('Odd numbers da 1 a 10:', odd.join(', '));
    `,

  "Objects array": `
      const people = [
        { name: 'Mario', age: 30 },
        { name: 'Luigi', age: 25 },
        { name: 'Anna', age: 22 }
      ];
      people.forEach(person => {
        console.log(\`\${person.name} is \${person.age} years old\`);
      });
    `,

  "Filter array greater": `
      const numbers = [10, 5, 15, 3, 20, 8];
      const greater10 = numbers.filter(n => n > 10);
      console.log('Numbers greater than 10:', greater10.join(', '));
    `,

  "Filter even numbers": `
      const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      const evenNumbers = numbers.filter(n => n % 2 === 0);
      console.log('Even numbers from 1 to 10:', evenNumbers.join(', '));
    `,

  "Filter adults": `
      const people = [
        { name: 'Mario', age: 30 },
        { name: 'Luigi', age: 25 },
        { name: 'Yoshi', age: 17 },
        { name: 'Peach', age: 22 }
      ];
      const adults = people.filter(person => person.age >= 18);
      console.log('Adults:', adults.map(p => p.name).join(', '));
    `,

  "Map squares": `
      const numbers = [1, 2, 3, 4, 5];
      const squares = numbers.map(n => n * n);
      console.log('Squares of the numbers '+numbers+':', squares.join(', '));
    `,

  "Map to double values": `
    const numbers = [1, 2, 3, 4, 5];
    const doubles = numbers.map(n => n * 2);
    console.log('Doubled values of the numbers ' + numbers + ':', doubles.join(', '));
  `,

  "Map to object names": `
    const people = [
      { name: 'Mario', age: 30 },
      { name: 'Luigi', age: 25 },
      { name: 'Yoshi', age: 22 }
    ];

      console.log('//Map only name');
      const names = people.map(person => person.name);
      console.log('Names of people:', names.join(', '));

      console.log('');
      console.log('//Cicle all people object');
      const namesAndAges = people.map(person => {
      console.log(\`Name: \${person.name}, Age: \${person.age}\`);
    });

   
 
  `,
};

export default scripts;
