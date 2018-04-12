<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/html">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="">
    <title>首页</title>

    <link href="/js/lib/bootstrap/css/bootstrap.css" rel="stylesheet"/>
    <link href="/js/lib/bootstrap/css/bootstrap-multiselect.css" rel="stylesheet"/>
    <link href="/css/page/index.css" rel="stylesheet"/>
</head>
<body>
<nav class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0">
    <a class="navbar-brand col-sm-3 col-md-2 mr-0" href="#">数据展示平台</a>
    <div class="form-control form-control-dark w-100" style="background:#000">
        <select id="record">
        <#list records as record>
            <#if record.getResult()==1>
                <option value="${record.getId()}">
                    记录时间：${record.getCreateTime()}
                    来源：
                    ${record.getHost()}:${record.getPort()}
                </option>
            </#if>
        </#list>
        </select>
    </div>
    <div class="form-control form-control-dark w-100" style="background:#000">
        <div id="msg"></div>
    </div>
    <ul class="navbar-nav px-3">
        <li class="nav-item text-nowrap">
            <a class="nav-link" href="/record">数据源管理</a>
        </li>
    </ul>
</nav>
<div class="container-fluid">
    <div class="row">
        <nav class="col-md-1 d-none d-md-block bg-light sidebar">
            <div class="sidebar-sticky">
                <ul class="nav flex-column">
                    <li class="nav-item">
                        <a class="nav-link active data_type" href="#" value="1">
                            <span data-feather="home"></span>
                            商户 <span class="sr-only">(current)</span>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link data_type" href="#" value="2">
                            <span data-feather="file"></span>
                            商品
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link data_type" href="#" value="3">
                            <span data-feather="file"></span>
                            商品流向
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
        <main role="main" class="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
            <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
                <h1 id="sub-title" class="h2"></h1>
                <div class="btn-toolbar mb-2 mb-md-0">
                    <div class="btn-group mr-2">
                        <div id="good_type_div">
                            <select multiple="multiple" id="good_type">种类</select>
                        </div>
                        <div id="start_point_div">
                            <select multiple="multiple" id="start_point">起点</select>
                        </div>
                        <div id="end_point_div">
                            <select multiple="multiple" id="end_point">终点</select>
                        </div>
                        <div id="year_div">
                            <select multiple="multiple" id="year">年份</select>
                        </div>
                        <button class="btn btn-sm btn-outline-secondary" id="export_chart">导出</button>
                        <select class="btn btn-sm btn-outline-secondary" id="chart_type">
                            <#--<option value="1">中国地图</option>-->
                            <#--<option value="2">饼图</option>-->
                            <#--<option value="3">折线图</option>-->
                        </select>
                    </div>
                </div>
            </div>
            <div class="container">
                <div class="row" id="chart">
                    <div class="col-md-12" id="chinaMap"></div>
                    <div class="col-md-12" id="pie"></div>
                    <div class="col-md-12" id="chartLine"></div>
                    <div class="col-md-12" id="chartChord"></div>
                </div>
            </div>
        </main>
    </div>
</div>

<script src="/js/lib/jquery/jquery-3.3.1.js"></script>
<#--boostrap-multiselect.js -> popper.js -->
<#--popper.js必须在bootstrap.js之前加载-->
<script src="/js/lib/bootstrap/js/popper.js"></script>
<script src="/js/lib/bootstrap/js/bootstrap.js"></script>
<#--<script src="/js/lib/bootstrap/js/require.js"></script>-->
<script src="/js/lib/bootstrap/js/bootstrap-multiselect.js"></script>
<script src="/js/lib/d3/d3.js"></script>
<script src="/js/lib/svg2png/saveSvgAsPng.js"></script>

<script src="/js/common/province_coordinates.js"></script>
<script src="/js/common/util.js"></script>
<script src="/js/common/pie.js"></script>
<script src="/js/common/chinaMap.js"></script>
<script src="/js/common/chartLine.js"></script>
<script src="/js/common/chartChord.js"></script>

<script src="/js/page/index.js"></script>
</body>
</html>