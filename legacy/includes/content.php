<?php
function content_get($key, $default = '')
{
    static $data = null;
    if ($data === null) {
        $path = __DIR__ . '/../content/content.json';
        if (file_exists($path)) {
            $json = file_get_contents($path);
            $data = json_decode($json, true);
        }
        if (!is_array($data)) {
            $data = [];
        }
    }
    return isset($data[$key]) ? $data[$key] : $default;
}
