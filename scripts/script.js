/*
* JS code to perform calculation and create a plot
* 
* by YL
*/


// run only if the page is fully loaded
$(document).ready(function(){

    // calculate values after pressing the button
    $("#calculate-wob").click(function(){

        var grossWeight = 0
        var totalMoment = 0
        var loadedCG = 0

        // iterate over each row and column in the table
        $('#inputs-table').find('tr').each(function () {

            var $tds = $(this).find('td');
            var weight = $tds.eq(1).find("input").val();
            var arm = $tds.eq(2).find("input").val();
            var moment = $tds.eq(3).find("input").val();


            // calculate moment
            var momentValue = parseInt( parseFloat(weight) * parseFloat(arm) )
            // add moment to the table
            $tds.eq(3).find("input").val(momentValue)

            // add value of the weight cell to the total weight
            // catch NaN inputs
            if ( ! isNaN(weight) ) {
                grossWeight += parseFloat(weight);
            }

            // add value of the moment cell to the total momebt
            // catch NaN inputs
            if ( ! isNaN(moment) ) {
                totalMoment += parseFloat(momentValue);
            }

        });

        // add gross weight to the table
        $("#gross-weight").val(grossWeight);

        // add total moment to the table
        $("#total-moment").val(totalMoment);

        // calculate loaded CG, round and add to the table
        loadedCG = parseFloat(totalMoment) / parseFloat(grossWeight)

        loadedCG = loadedCG.toFixed(2);
        $("#loaded-CG").val(loadedCG);

        // change button CSS
        $("#calculate-wob").html("Recalculate");


        // plot the data
        var ctx = document.getElementById('cgChart').getContext('2d');

        var grossWeightData = [1733, 2300, 2300, 2300, 2300, 2300, 2300, 2300, 2300, 2300, 2300, 2300, 2300];
        var cg = [35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48];

        console.log(loadedCG)

        // create a plot
        var chart = new Chart(ctx, {
            // The type of chartto create
            type: 'line',

            data: {
                datasets: [{
                    // point plot
                    type: 'scatter',
                    label: "CG Value",
                    data: [{
                        x: parseInt(loadedCG),
                        y: grossWeight,
                    }],  
                    pointBorderColor: "#FF0000",
                    pointBackgroundColor: '#FF0000',
                    backgroundColor: '#FF0000',
                    borderColor: '#FF0000',
                    radius: 5
                }, {
                    // line plot
                    type: 'line',
                    label: 'Acceptable limits',
                    data: grossWeightData,
                    pointStyle: 'rectRounded',
                    lineTension: 0,
                    pointRadius: 0,
                    backgroundColor: 'rgba(55, 173, 221, 0.6)',
                    borderColor: 'rgba(55, 173, 221, 1.0)',
                    fill: true  
                }],

                labels: cg
            },

            // Configuration options 
            options: {
                legend: {
                    display: true
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            min: 1400,
                            max: 2400,
                            beginAtZero: false
                        }
                    }]
                }
            }
        });

    });
});