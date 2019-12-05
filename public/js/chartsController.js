window.onload = async function(){
    console.log("CHARTS AJFLSDGHJDSKJDS")
    const responce = await this.fetch("/userdata");
    const response = await responce.json();
    console.log(response);
    console.log(response.q11a);
    var ct1 = document.getElementById('userChart1').getContext('2d');
    var ct2 = document.getElementById('userChart2').getContext('2d');
    var ct3 = document.getElementById('userChart3').getContext('2d');
    var yellowAmnt=response.q11a;
    var redAmnt=response.q12a;
    var blueAmnt=response.q13a;
    var greenAmnt=response.q14a;
    var loveItAmnt=response.q21a;
    var hateItAmnt=response.q22a;
    var triangleAmnt=response.q23a;
    var notSureAmnt=response.q24a;
    var pizzaAmnt=response.q31a;
    var hamburgerAmnt=response.q32a;
    var chickenAmnt=response.q33a;
    var saladAmnt=response.q34a;

    var userChart1 = new Chart(ct1, {
        type: 'pie',
        data: {
            labels: ['Red', 'Blue', 'Yellow', 'Green'],
            datasets: [{
                label: '# of People Who Like Theses Colors',
                data: [yellowAmnt,redAmnt,blueAmnt,greenAmnt],
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
        type: 'pie',
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
        type: 'pie',
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