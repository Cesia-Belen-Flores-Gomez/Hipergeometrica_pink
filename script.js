// Función para calcular el factorial
function factorial(num) {
    if (num === 0 || num === 1) return 1;
    let result = 1;
    for (let i = 2; i <= num; i++) {
        result *= i;
    }
    return result;
}

// Función para calcular la probabilidad hipergeométrica
function hypergeometric(N, K, n, x) {
    const comb = (a, b) => factorial(a) / (factorial(b) * factorial(a - b));
    return (
        comb(K, x) * comb(N - K, n - x)
    ) / comb(N, n);
}

// Escuchar el evento del botón
document.getElementById('calculate-btn').addEventListener('click', function () {
    // Leer valores del formulario
    const N = parseInt(document.getElementById('N').value);
    const K = parseInt(document.getElementById('K').value);
    const n = parseInt(document.getElementById('n').value);
    const x = parseInt(document.getElementById('x').value);

    // Validar los datos
    if (x > n || n > N || K > N) {
        document.getElementById('result-text').textContent =
            "Por favor, verifica que los valores ingresados sean válidos.";
        return;
    }

    // Calcular probabilidades para todos los valores posibles de x
    const probabilidades = [];
    for (let i = 0; i <= n; i++) {
        probabilidades.push(hypergeometric(N, K, n, i));
    }

    // Mostrar resultado específico
    document.getElementById('result-text').textContent =
        `La probabilidad P(X = ${x}) es: ${probabilidades[x].toFixed(6)}`;

    // Crear gráfica
    const ctx = document.getElementById('chart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: probabilidades.map((_, i) => i),
            datasets: [{
                label: 'Distribución Hipergeométrica',
                data: probabilidades,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
});
