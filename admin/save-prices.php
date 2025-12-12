<?php
session_start();
header('Content-Type: application/json; charset=utf-8');
if (empty($_SESSION['admin_logged'])) {
    echo json_encode(['result' => 'error', 'info' => 'unauthorized']);
    exit;
}
$path = __DIR__ . '/../data/prices.json';
$raw = file_get_contents('php://input');
$decoded = json_decode($raw, true);
if (json_last_error() !== JSON_ERROR_NONE) {
    echo json_encode(['result' => 'error', 'info' => 'bad json']);
    exit;
}
// Простая валидация как в редакторе
function validate_prices($decoded)
{
    if (!is_array($decoded))
        return 'Корень JSON должен быть объектом';
    foreach ($decoded as $material => $sizes) {
        if (!is_array($sizes))
            return "Материал '$material' должен содержать объект ширин";
        foreach ($sizes as $size => $tiers) {
            // Специальное поле-примечание материала, не таблица цен
            if ($size === '__note')
                continue;
            if (!is_array($tiers))
                return "'$material' → '$size' должен быть массивом диапазонов";
            foreach ($tiers as $i => $pair) {
                if (!is_array($pair) || count($pair) !== 2)
                    return "'$material' → '$size' → запись #$i должна быть [макс, цена]";
                if (!is_numeric($pair[0]) || !is_numeric($pair[1]))
                    return "'$material' → '$size' → запись #$i содержит нечисловые значения";
            }
        }
    }
    return null;
}
$err = validate_prices($decoded);
if ($err) {
    echo json_encode(['result' => 'error', 'info' => $err]);
    exit;
}
// Бэкап
$backupName = __DIR__ . '/../data/prices.' . date('Ymd-His') . '.bak.json';
copy($path, $backupName);
file_put_contents($path, json_encode($decoded, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT));
echo json_encode(['result' => 'success', 'info' => 'saved']);
