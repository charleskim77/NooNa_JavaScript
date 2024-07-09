<?php
// API 키를 안전한 방법으로 저장 (예: 환경 변수 또는 설정 파일)
$api_key = 'bad7a21cecaa4a4babf650767c4a2b98';

// CORS 설정 (필요한 경우)
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

// API 키 반환
echo json_encode(['api_key' => $api_key]);
?>

