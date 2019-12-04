window.onload = function(){
    console.log("CHARTS AJFLSDGHJDSKJDS")
    var ct1 = document.getElementById('userChart1').getContext('2d');
    var ct2 = document.getElementById('userChart2').getContext('2d');
    var ct3 = document.getElementById('userChart3').getContext('2d');
    var redAmnt=4;
    var blueAmnt=3;
    var yellowAmnt=2;
    var greenAmnt=6;
    var loveItAmnt=1;
    var hateItAmnt=9;
    var triangleAmnt=4;
    var notSureAmnt=7;
    var pizzaAmnt=10;
    var hamburgerAmnt=23;
    var chickenAmnt=5;
    var saladAmnt=1;

    var userChart1 = new Chart(ct1, {
        type: 'pie',
        data: {
            labels: ['Red', 'Blue', 'Yellow', 'Green'],
            datasets: [{
                label: '# of People Who Like Theses Colors',
                data: [redAmnt,blueAmnt,yellowAmnt,greenAmnt],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });

    var userChart2 = new Chart(ct2, {
        type: 'bar',
        data: {
            labels: ['Love It!', 'Hate It!', 'Triangle!', 'Not Sure...'],
            datasets: [{
                label: 'Peoples\' opinion on the cybertruck',
                data: [loveItAmnt, hateItAmnt, triangleAmnt, notSureAmnt],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });

    var userChart3 = new Chart(ct3, {
        type: 'horizontalBar',
        data: {
            labels: ['Pizza', 'Hamburger', 'Chicken', 'Salad'],
            datasets: [{
                label: '# of people who like these foods',
                data: [pizzaAmnt, hamburgerAmnt, chickenAmnt, saladAmnt],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}