<?php
$titlePage = 'Шинный калькулятор';
include_once $_SERVER['DOCUMENT_ROOT'] . '/include/header.php';
?>

<section id="data1" class="data_main">
    <div class="container">

        <div class="form">
            <div class="form_data" data-id="1" data-color="#5c636a">
                <p class="p_name">Диск</p>
                <div class="form-items">
                    <div class="form-item">
                        <input type="number" step="1" id="d1" class="form-input" required/>
                        <label class="form-label" for="d1">Диаметр</label>
                    </div>
                    <div class="form-item">
                        <input type="number" step="0.25" id="w1" class="form-input" required/>
                        <label class="form-label" for="w1">Ширина</label>
                    </div>
                    <div class="form-item">
                        <input type="number" step="0.1" id="et1" class="form-input" required/>
                        <label class="form-label" for="et1">Вылет</label>
                    </div>
                </div>

                <p class="p_name"><span class="arr-block-left"></span>Шина</p>
                <div class="form-items">
                    <div class="form-item">
                        <input type="number" id="tw1" class="form-input" required/>
                        <label class="form-label" for="tw1">Ширина</label>
                    </div>
                    <div class="form-item">
                        <input type="number" step="5" id="pr1" class="form-input" required/>
                        <label class="form-label" for="pr1">Профиль</label>
                    </div>
                </div>
                <hr/>
            </div>

            <div class="form_data" data-id="2" data-color="#990000">
                <p class="p_name">Диск</p>
                <div class="form-items">
                    <div data-id="2" class="form-item">
                        <input type="number" step="1" id="d2" class="form-input" required/>
                        <label class="form-label" for="d2">Диаметр</label>
                    </div>

                    <div class="form-item">
                        <input type="number" step="0.25" id="w2" class="form-input" required/>
                        <label class="form-label" for="w2">Ширина</label>
                    </div>

                    <div class="form-item">
                        <input type="number" id="et2" class="form-input" required/>
                        <label class="form-label" for="et2">Вылет</label>
                    </div>
                </div>

                <p class="p_name"><span class="arr-block-right"></span>Шина</p>
                <div class="form-items">
                    <div class="form-item">
                        <input type="number" id="tw2" class="form-input" required/>
                        <label class="form-label" for="tw2">Ширина</label>
                    </div>

                    <div class="form-item">
                        <input type="number" id="pr2" class="form-input" required/>
                        <label class="form-label" for="pr2">Профиль</label>
                    </div>
                </div>
                <hr/>
            </div>

        </div>

    </div>

</section>

<section id="visual">
    <div class="container">
        <div class="visual">
            <canvas id="myCanvas1" width="800px" height="800px"></canvas>
            <canvas id="myCanvas2" width="800px" height="800px"></canvas>
        </div>
    </div>
</section>

<p id="main-info" class="text-center"></p>

<section id="information_briefly">
    <div class="container">
        <div class="row wheel-all-setting">
            <div class="col"></div>
            <div class="col text-center">
                <div class="wheel-all-setting-left">
                    <p>Текущие</p>
                    <p id="main-setting1"></p>
                </div>
            </div>
            <div class="col text-center">
                <div class="wheel-all-setting-right">
                    <p>Новые</p>
                    <p id="main-setting2"></p>
                </div>
            </div>
        </div>
    </div>

</section>

<section id="information_all">
    <div class="container">
        <div class="row">
            <div class="col"></div>
            <div class="col text-center">
<!--                <span class="arr-setting-left"></span>-->
                <span class="arr-set1 arr-setting"></span>
            </div>
            <div class="col text-center">
<!--                <span class="arr-setting-right"></span>-->
                <span class="arr-set2 arr-setting"></span>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <p>Диаметр колеса</p>
            </div>
            <div class="col text-center">
                <p id="diam-change1"></p>
            </div>
            <div class="col text-center">
                <p id="diam-change2"></p>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <p>Ширина диска</p>
            </div>
            <div class="col text-center">
                <p>... мм</p>
            </div>
            <div class="col text-center">
                <p>... мм</p>
            </div>
        </div>
    </div>
</section>
    <script src="/js/calc.js?<?=filemtime($_SERVER['DOCUMENT_ROOT'] . '/js/calc.js')?>"></script>
<?php
include_once $_SERVER['DOCUMENT_ROOT'] . '/include/footer.php';
?>