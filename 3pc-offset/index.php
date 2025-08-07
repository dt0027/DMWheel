<?php

$titlePage = 'Рассчет вылета составных дисков онлайн';
include_once $_SERVER['DOCUMENT_ROOT'] . '/include/header.php';
?>
    <section id="data1" class="data_main">
        <div class="container container_form">
            <h1 class="h1-tire-calculator">Калькулятор составных дисков</h1>
            <div class="form">
                <div class="form_data" data-id="1" data-color="#5c636a">
                    <p class="p_name">Диск</p>
                    <div class="form-items">
                        <div class="form-item">
                            <input type="number" step="1" id="diam1" class="form-input" required/>
                            <label class="form-label" for="diam1">Диаметр</label>
                        </div>
                        <!--                    <div class="form-item">-->
                        <!--                        <input type="number" step="0.25" id="width1" class="form-input" required/>-->
                        <!--                        <label class="form-label" for="width1">Ширина</label>-->
                        <!--                    </div>-->
                        <div class="form-item">
                            <input type="number" step="0.1" id="et1" class="form-input" required/>
                            <label class="form-label" for="et1">Вылет</label>
                        </div>
                    </div>

                    <p class="p_name"><span class="arr-block-left"></span>3pc</p>
                    <div class="form-items">
                        <div class="form-item">
                            <input type="number" step="0.25" id="out1" class="form-input" required/>
                            <label class="form-label" for="out1">Полка</label>
                        </div>
                        <div class="form-item">
                            <input type="number" step="0.25" id="inner1" class="form-input" required/>
                            <label class="form-label" for="inner1">Иннер</label>
                        </div>
                        <!--                    <div class="form-item">-->
                        <!--                        <input type="number" id="center1" class="form-input" required/>-->
                        <!--                        <label class="form-label" for="center1">Центр</label>-->
                        <!--                    </div>-->
                    </div>
                    <hr/>
                </div>

                <div class="form_data" data-id="2" data-color="#990000">
                    <p class="p_name">Диск</p>
                    <div class="form-items">
                        <div class="form-item">
                            <input type="number" step="1" id="diam2" class="form-input" required/>
                            <label class="form-label" for="diam2">Диаметр</label>
                        </div>
                        <!--                    <div class="form-item">-->
                        <!--                        <input type="number" step="0.25" id="width2" class="form-input" required/>-->
                        <!--                        <label class="form-label" for="width2">Ширина</label>-->
                        <!--                    </div>-->
                        <div class="form-item">
                            <input type="hidden" step="0.1" id="et2" class="form-input" required/>
                            <label class="form-label" for="et2">Вылет</label>
                        </div>
                    </div>

                    <p class="p_name"><span class="arr-block-left"></span>3pc</p>
                    <div class="form-items">
                        <div class="form-item">
                            <input type="number" step="0.25" id="out2" class="form-input" required/>
                            <label class="form-label" for="out2">Полка</label>
                        </div>
                        <div class="form-item">
                            <input type="number" step="0.25" id="inner2" class="form-input" required/>
                            <label class="form-label" for="inner2">Иннер</label>
                        </div>
                        <!--                    <div class="form-item">-->
                        <!--                        <input type="number" id="center2" class="form-input" required/>-->
                        <!--                        <label class="form-label" for="center2">Центр</label>-->
                        <!--                    </div>-->
                    </div>
                    <hr/>
                </div>

            </div>

        </div>

    </section>

    <section id="visual">
        <div class="container container_visual">
            <div class="visual">
                <canvas id="myCanvas1" width="800px" height="800px"></canvas>
                <canvas id="myCanvas2" width="800px" height="800px"></canvas>
            </div>
        </div>
        <div class="container">
            <div class="row">
                <div class="col">
                    <a href="../img">
                        <img src="../img/inner_file/page_file.svg" id="page_file1" alt="page_file">
                    </a>
                </div>
                <div class="col">
                    <a href="../img">
                        <img src="../img/inner_file/page_file.svg" id="page_file2" alt="page_file">
                    </a>
                </div>
            </div>
        </div>
    </section>

    <section id="information_main">
        <p id="main-info" class="text-center main-info-top"></p>
        <p id="main-info-2" class="text-center main-info-top"></p>
    </section>


    <script src="/js/calc3pc.js?<?= filemtime($_SERVER['DOCUMENT_ROOT'] . '/js/calc.js') ?>"></script>
<?php
include_once $_SERVER['DOCUMENT_ROOT'] . '/include/footer.php';
?>