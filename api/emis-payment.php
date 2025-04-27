
<?php
// Habilitar CORS para permitir requisições do seu domínio
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

// Se for uma requisição OPTIONS (preflight), retornar apenas os headers
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Verificar se é uma requisição POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Método não permitido']);
    exit;
}

// Ler o corpo da requisição
$jsonData = file_get_contents('php://input');
$data = json_decode($jsonData, true);

// Validar dados recebidos
if (!$data || !isset($data['reference']) || !isset($data['amount']) || !isset($data['token'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Dados inválidos']);
    exit;
}

// URL da API do EMIS
$emisUrl = 'https://pagamentonline.emis.co.ao/online-payment-gateway/portal/frameToken';

// Preparar os dados para enviar ao EMIS
$postData = [
    'reference' => $data['reference'],
    'amount' => $data['amount'],
    'token' => $data['token'],
    'mobile' => 'PAYMENT',
    'card' => 'DISABLED',
    'qrCode' => 'PAYMENT',
    'callbackUrl' => $data['callbackUrl']
];

// Inicializar cURL
$ch = curl_init($emisUrl);

// Configurar opções do cURL
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($postData));
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json'
]);

// Executar a requisição
$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

// Verificar erros do cURL
if (curl_errno($ch)) {
    $error = curl_error($ch);
    curl_close($ch);
    http_response_code(500);
    echo json_encode(['error' => 'Erro ao conectar com EMIS: ' . $error]);
    exit;
}

curl_close($ch);

// Enviar a resposta do EMIS de volta para o cliente
http_response_code($httpCode);
echo $response;
?>
