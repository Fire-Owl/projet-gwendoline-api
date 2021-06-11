<?php
require_once 'simple_dom/simple_html_dom.php';
$dom = file_get_html('https://www.sportmag.fr/sport-handi', false);
/* echo $dom; */
$pattern_last = "/<div class=\"edgtf-post-example-item-three-item edgtf-post-item\">/i";
$pattern_previous = "/<div class=\"edgtf-peis-content-holder\">/i";
$count_last = preg_match_all($pattern_last, $dom);
$count_previous = preg_match_all($pattern_previous, $dom);
$count_page = $count_last+$count_previous;
echo 'nombre d\'articles présents sur cette page : '.$count_page;