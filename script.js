xn_trapezoidal = 0;
xn_simpson     = 0;

function compute_trapezoidal_simpson() {
    func        = document.getElementById("value_function").value
    a           = parseFloat(document.getElementById("value_a_mp4").value);
    b           = parseFloat(document.getElementById("value_b_mp4").value)
    n           = parseFloat(document.getElementById("subinterval").value)
    delta_x     = parseFloat((b - a) / n);

    try {
        if ( document.getElementById("value_function").value == "" || document.getElementById("value_a_mp4").value == "" || document.getElementById("value_b_mp4").value == "" || document.getElementById("subinterval").value == "") {
            window.alert("Input incomplete. Please fill up all given inputs")
        }
        else {
            if (b > a) {
                //CONVERSION (symbols of polynomials, trigonometric, and exponential)
                formula_sign = func.replace(/pi/g,"Math.PI").replace(/sqrt/g,"Math.sqrt").replace(/0x/g,"0").replace(/1x/g,"x").replace(/2x/g,"2*x").replace(/3x/g,"3*x").replace(/4x/g,"4*x").replace(/5x/g,"5*x").replace(/6x/g,"6*x").replace(/7x/g,"7*x").replace(/8x/g,"8*x").replace(/9x/g,"9*x");
                formula_trig = formula_sign.replace(/sin/g,"Math.sin").replace(/cos/g,"Math.cos").replace(/tan/g,"Math.tan").replace(/csc/g,"1/Math.sin").replace(/sec/g,"1/Math.cos").replace(/cot/g,"1/Math.tan");
                formula_exp  = formula_trig.replaceAll("^","**").replace(/e/g,"Math.E");
                formula_html = formula_exp;
    
                // initial value xi
                store_values_xn = [];
                for (i = 0; i < n; i++) {
                    store_values_xn.push(a + (delta_x * (i+1))); // xi
                }
    
                // function // store the values
                store_values_xn_function = [];
                x = a;
                store_values_xn_function.push(eval(formula_html)); // for x0
                for (i = 0; i < n; i++) {
                    x = store_values_xn[i];
                    store_values_xn_function.push(eval(formula_html)); // for xn 
                }
    
                // multiply by 2 - trapezoidal
                store_values_xn_sum_trapezoidal = 0;
                for (i = 0; i < store_values_xn_function.length; i++) {
                    if(i == 0 || i == store_values_xn_function.length - 1) {
                        store_values_xn_sum_trapezoidal += store_values_xn_function[i];
                    }
                    else {
                        store_values_xn_sum_trapezoidal += store_values_xn_function[i] * 2;
                    }
                }
    
                // multiply by 2 and 4 - simpson
                store_values_xn_sum_simpson = 0
                for (i = 0; i < store_values_xn_function.length; i++) {
                    if(i == 0 || i == store_values_xn_function.length - 1) {
                        store_values_xn_sum_simpson += store_values_xn_function[i];
                    }
                    else {
                        if(i % 2 == 0) {
                            store_values_xn_sum_simpson += store_values_xn_function[i] * 2;
                        }
                        else {
                            store_values_xn_sum_simpson += store_values_xn_function[i] * 4;
                        }
                    }
                }
    
                // Trapezoidal
                trapezoidal = (delta_x / 2) * store_values_xn_sum_trapezoidal;
                xn_trapezoidal = trapezoidal;
                // Simpson
                simpson = (delta_x / 3) * store_values_xn_sum_simpson;
                xn_simpson = simpson;
    
                // Print 
                document.getElementById("result_trapezoidal").innerHTML = trapezoidal;
                if (n % 2 == 0) {
                    document.getElementById("result_simpson").innerHTML = simpson;
                }
                else {
                    document.getElementById("result_simpson").innerHTML = "subintevral (n) should be an even number"
                }
            }
            else {
                window.alert("The lower limit (a) should be less than the upper limit (b).")
            }
            compute_trapezoidal_error();
            compute_simpson_error();
        }
    }
    catch (e) {
        window.alert("There is an error in your input. Please try again.")
    }
}

function compute_trapezoidal_error() {
    func        = document.getElementById("value_function").value;
    a           = parseFloat(document.getElementById("value_a_mp4").value);
    b           = parseFloat(document.getElementById("value_b_mp4").value);
    n           = parseFloat(document.getElementById("subinterval").value) - 1;
    delta_x     = parseFloat((b - a) / n);

    //CONVERSION (symbols of polynomials, trigonometric, and exponential)
    formula_sign = func.replace(/pi/g,"Math.PI").replace(/sqrt/g,"Math.sqrt").replace(/0x/g,"0").replace(/1x/g,"x").replace(/2x/g,"2*x").replace(/3x/g,"3*x").replace(/4x/g,"4*x").replace(/5x/g,"5*x").replace(/6x/g,"6*x").replace(/7x/g,"7*x").replace(/8x/g,"8*x").replace(/9x/g,"9*x");
    formula_trig = formula_sign.replace(/sin/g,"Math.sin").replace(/cos/g,"Math.cos").replace(/tan/g,"Math.tan").replace(/csc/g,"1/Math.sin").replace(/sec/g,"1/Math.cos").replace(/cot/g,"1/Math.tan");
    formula_exp  = formula_trig.replaceAll("^","**").replace(/e/g,"Math.E");
    formula_html = formula_exp;

    // initial value xi
    store_values_xn = [];
    for (i = 0; i < n; i++) {
        store_values_xn.push(a + (delta_x * (i+1))); // xi
    }

    // function // store the values
    store_values_xn_function = [];
    x = a;
    store_values_xn_function.push(eval(formula_html)); // for x0
    for (i = 0; i < n; i++) {
        x = store_values_xn[i];
        store_values_xn_function.push(eval(formula_html)); // for xn 
    }

    // multiply by 2 - trapezoidal
    store_values_xn_sum_trapezoidal = 0;
    for (i = 0; i < store_values_xn_function.length; i++) {
        if(i == 0 || i == store_values_xn_function.length - 1) {
            store_values_xn_sum_trapezoidal += store_values_xn_function[i];
        }
        else {
            store_values_xn_sum_trapezoidal += store_values_xn_function[i] * 2;
        }
    }

    // Trapezoidal
    trapezoidal = (delta_x / 2) * store_values_xn_sum_trapezoidal;

    error_trapezoidal = ((Math.abs(xn_trapezoidal -  trapezoidal)) / xn_trapezoidal) * 100;

    // Print 
    document.getElementById("relative_error_trapezoidal").innerHTML = error_trapezoidal + "%";
}

function compute_simpson_error() {
    func        = document.getElementById("value_function").value;
    a           = parseFloat(document.getElementById("value_a_mp4").value);
    b           = parseFloat(document.getElementById("value_b_mp4").value);
    n           = parseFloat(document.getElementById("subinterval").value) - 2;
    delta_x     = parseFloat((b - a) / n);

    //CONVERSION (symbols of polynomials, trigonometric, and exponential)
    formula_sign = func.replace(/pi/g,"Math.PI").replace(/sqrt/g,"Math.sqrt").replace(/0x/g,"0").replace(/1x/g,"x").replace(/2x/g,"2*x").replace(/3x/g,"3*x").replace(/4x/g,"4*x").replace(/5x/g,"5*x").replace(/6x/g,"6*x").replace(/7x/g,"7*x").replace(/8x/g,"8*x").replace(/9x/g,"9*x");
    formula_trig = formula_sign.replace(/sin/g,"Math.sin").replace(/cos/g,"Math.cos").replace(/tan/g,"Math.tan").replace(/csc/g,"1/Math.sin").replace(/sec/g,"1/Math.cos").replace(/cot/g,"1/Math.tan");
    formula_exp  = formula_trig.replaceAll("^","**").replace(/e/g,"Math.E");
    formula_html = formula_exp;

    // initial value xi
    store_values_xn = [];
    for (i = 0; i < n; i++) {
        store_values_xn.push(a + (delta_x * (i+1))); // xi
    }

    // function // store the values
    store_values_xn_function = [];
    x = a;
    store_values_xn_function.push(eval(formula_html)); // for x0
    for (i = 0; i < n; i++) {
        x = store_values_xn[i];
        store_values_xn_function.push(eval(formula_html)); // for xn 
    }

    // multiply by 2 and 4 - simpson
    store_values_xn_sum_simpson = 0
    for (i = 0; i < store_values_xn_function.length; i++) {
        if(i == 0 || i == store_values_xn_function.length - 1) {
            store_values_xn_sum_simpson += store_values_xn_function[i];
        }
        else {
            if(i % 2 == 0) {
                store_values_xn_sum_simpson += store_values_xn_function[i] * 2;
            }
            else {
                store_values_xn_sum_simpson += store_values_xn_function[i] * 4;
            }
        }
    }

    // Simpson
    simpson = (delta_x / 3) * store_values_xn_sum_simpson;

    error_simpson = ((Math.abs(xn_simpson -  simpson)) / xn_simpson) * 100;

    // Print 
    if (n % 2 == 0) {
        document.getElementById("relative_error_simpson").innerHTML = error_simpson + "%";
    }
    else {
        document.getElementById("relative_error_simpson").innerHTML = "subintevral (n) should be an even number"
    }
}

function clear_trapezoidal_simpson() {
    document.getElementById("value_function").value         = "";
    document.getElementById("value_a_mp4").value                = "";
    document.getElementById("value_b_mp4").value                = "";
    document.getElementById("subinterval").value            = "";
    document.getElementById("result_trapezoidal").innerHTML = "- - -";
    document.getElementById("result_simpson").innerHTML     = "- - -";
    document.getElementById("relative_error_trapezoidal").innerHTML = "- - -";
    document.getElementById("relative_error_simpson").innerHTML = "- - -"
}