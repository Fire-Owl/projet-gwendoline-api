<?php 
require_once 'simple_html_dom.php';

$dom = file_get_html('https://www.sportmag.fr/category/sport-handi/', false);

$answer = array();
if(!empty($dom)) {
    $divClass = $title = $i = 0;
    foreach($dom->find(".edgtf-peis-content-holder") as $divClass) {
        foreach($divClass->find(".edgtf-peis-title") as $title ) {
            $answer[$i]['title'] = $title->plaintext;
        }

        foreach($divClass->find(".edgtf-post-info-author") as $author) {
            $answer[$i]['Author'] = $author->plaintext;
        }

        foreach($divClass->find('.edgtf-post-excerpt') as $desc) {
            $answer[$i]['content'] = $desc->plaintext;
        }
        $i++;
    }
}

print_r($answer); exit;

function array_to_xml($array, &$xml_user_info) {
    foreach($array as $key => $value) {
    if(is_array($value)) {
    $subnode = $xml_user_info->addChild("Review$key");
    foreach ($value as $k=>$v) {
    $xml_user_info->addChild("$k", $v);
    }
    }else {
    $xml_user_info->addChild("$key",htmlspecialchars("$value"));
    }
    }
    return $xml_user_info->asXML();
    }
    $xml_user_info = new SimpleXMLElement("<?xml version=\”1.0\”?><root></root>");
    $xmlContent = array_to_xml($answer,$xml_user_info);

    $my_file = 'info.xml';
    $handle = fopen($my_file, 'w') or die('Cannot open file:'.$my_file);

    if(fwrite($handle,$xmlContent)){
        echo 'XML file have been generated successfully.';
    }
    else {
        echo 'XML file generation error.';
    }

    ?>