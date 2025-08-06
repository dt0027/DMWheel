<?php
$titlePage = 'Галерея фото с примерами';
include_once $_SERVER['DOCUMENT_ROOT'] . '/include/header.php';
?>

<section id="page-section">
    <div class="container">
        <div class="row text-center">
            <h1>Галерея фото c примерами</h1>
        </div>

        <div id="carouselExampleCaptions" class="carousel slide">
            <div class="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>
            <div class="carousel-inner">
                <div class="carousel-item active">
                    <img src="/img/275_35_20x10/triangle.jpg" class="d-block w-100" alt="...">
                    <div class="carousel-caption d-none d-md-block">
                        <h5>BMW F10</h5>
                        <p>Разноширокий комплект:<br>
                            245/40 | 20x8.5 5x120 ET30<br>
                            275/35 | 20x10 5x120 ET35</p>
                    </div>
                </div>
                <div class="carousel-item">
                    <img src="/img/245_35_20x11/grenlander-l-zeal56(2).jpg" class="d-block w-100" alt="...">
                    <div class="carousel-caption d-none d-md-block">
                        <p>245/35 | 20x11</p>
                    </div>
                </div>
                <div class="carousel-item">
                    <img src="/img/205_50_17x8/pirelli-cinturato-p7.jpg" class="d-block w-100" alt="...">
                    <div class="carousel-caption d-none d-md-block">
                        <p>pirelli-cinturato-p7 205/50 | 17x8</p>
                    </div>
                </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Предыдущий</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Следующий</span>
            </button>
        </div>

    </div>
</section>
    <script src="/js/calc.js?<?=filemtime($_SERVER['DOCUMENT_ROOT'] . '/js/calc.js')?>"></script>
<?php
include_once $_SERVER['DOCUMENT_ROOT'] . '/include/footer.php';
?>


