<?php
require_once 'simple_dom/simple_html_dom.php';
$dom = file_get_html('https://www.sportmag.fr/sport-handi', false);
echo $dom;