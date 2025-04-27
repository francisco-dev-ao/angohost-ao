
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

// Preparar os dados para enviar ao EMIS - seguindo o manual para "Compra a um tempo"
$postData = [
    'reference' => $data['reference'],
    'amount' => $data['amount'],
    'token' => $data['token'],
    'mobile' => 'PAYMENT',    // Isso força o EMIS a solicitar o telefone do cliente
    'card' => 'DISABLED',     // Desabilitar pagamento por cartão
    'qrCode' => 'PAYMENT',    // Habilitar pagamento por QR Code
    'callbackUrl' => $data['callbackUrl']
];

// Log para depuração
error_log('Enviando requisição para EMIS: ' . json_encode($postData));

// Inicializar cURL
$ch = curl_init($emisUrl);

// Configurar opções do cURL
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($postData));
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json'
]);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false); // Para desenvolvimento - remover em produção!
curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false); // Para desenvolvimento - remover em produção!
curl_setopt($ch, CURLOPT_TIMEOUT, 30); // Timeout em segundos

// Executar a requisição
$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

// Log da resposta
error_log('Resposta da EMIS (código ' . $httpCode . '): ' . $response);

// Verificar erros do cURL
if (curl_errno($ch)) {
    $error = curl_error($ch);
    curl_close($ch);
    error_log('Erro cURL: ' . $error);
    http_response_code(500);
    echo json_encode(['error' => 'Erro ao conectar com EMIS: ' . $error]);
    exit;
}

curl_close($ch);

// Enviar a resposta do EMIS de volta para o cliente
http_response_code($httpCode);
echo $response;
?>
