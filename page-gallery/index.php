<?php
$titlePage = 'Галерея фото с примерами';
include_once $_SERVER['DOCUMENT_ROOT'] . '/include/header.php';
?>

<section id="page-section">
    <div class="container">
        <div class="row text-center">
            <h2>Галерея фото</h2>
        </div>

    </div>
</section>
    <script src="/js/calc.js?<?=filemtime($_SERVER['DOCUMENT_ROOT'] . '/js/calc.js')?>"></script>
<?php
include_once $_SERVER['DOCUMENT_ROOT'] . '/include/footer.php';
?>