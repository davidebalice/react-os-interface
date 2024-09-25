const scripts = {
  Greetings: `
      function greet(name,surname) {
        return \`Hi \${name} \${surname}!\`;
      }
      console.log(greet('Mario','Rossi'));
    `,

  Sum: `
      const sum = 5 + 3;
      console.log('La somma di 5 + 3 è:', sum);
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
        console.log(\`\${person.name} ha \${person.age} age\`);
      });
    `,

  "Filtrare array": `
      const numeri = [10, 5, 15, 3, 20, 8];
      const numeriMaggioriDi10 = numeri.filter(n => n > 10);
      console.log('Numeri maggiori di 10:', numeriMaggioriDi10.join(', '));
    `,

  "Mappare array": `
      const numeri = [1, 2, 3, 4, 5];
      const quadrati = numeri.map(n => n * n);
      console.log('Quadrati dei numeri:', quadrati.join(', '));
    `,
};

export default scripts;
