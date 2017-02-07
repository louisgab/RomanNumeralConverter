document.addEventListener('keyup', function(event) {
    var input = document.getElementById("input").value;
    if (input > 3999) {
        document.getElementById("output").value = "Exceeded";
    }
    else{
        var output = convertToRoman(input);
        document.getElementById("output").value = output;
    }
}, true);

var numerals = [ 1000, 500, 100, 50, 10, 5, 1 ],
    romans = [ "M", "D", "C", "L", "X", "V", "I" ];

function numeralToArray(num){
    var length = num.toString().length, array = [];
    for (var i = 1 ; i <= length ; i++){
        var val = num % (Math.pow(10, i));
        array.push(val);
        num = num - val;
    }
    return array.reverse();
}

function romanize(value){
    var rom = 0, res = "";
    while(value > 0){
        if(numerals[rom] > value){
            rom += 1;
        }
        else{
            res += romans[rom];
            value -= numerals[rom];
        }
    }
    return res;
}

function minimize(string){
    var letters = string.split("");
    for(var i = 0 ; i < letters.length ; i++){
        var count = 1, next = i + 1;
        while(letters[i] == letters[next] ){
            count += 1;
            next += 1;
        }
        if(count > 3){
            letters.splice(i, count, letters[i] + romans[romans.indexOf(letters[i]) - 1] );
        }
    }
    return letters.join("").toString();
}

function optimize(string){
    var letters = string.split("");
    for(var i = 0 ; i < letters.length ; i++){
        if(letters[i] == letters[i + 2] && letters[i] != letters[i + 1]){
            letters.splice(i, 3, letters[i + 1] + romans[romans.indexOf(letters[i]) - 1] );
        }
    }
    return letters.join("").toString();
}

function convertToRoman(num) {
    var array = numeralToArray(num);
    for(var i = 0 ; i < array.length ; i++){
        array[i] = romanize(array[i]);
        array[i] = minimize(array[i]);
        array[i] = optimize(array[i]);
    }
    return array.join("").toString();
}
