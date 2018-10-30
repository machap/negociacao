(function(){
    let numeros = [3,2,11,20,8,7];
    console.log(numeros);

    let novosNumeros = numeros.map(item => (item % 2 === 0) ? item * 2 : item);
      
    console.log(novosNumeros);

})()