$(document).ready(function () {
    getCurrentNavigation();

});

function quickSearch() {
    var kwd = $("#top-keyword").val();
    window.location.href = 'SearchController&Keyword=' + kwd;
}

function submitAdvance() {
    $("#search-advance").submit();
}

function submitSimple() {
    $("#search-simple").submit();
}

function brandAjax() {
    $(".brands li a").not(".current").click(function () {
        var link = $(this).attr("href");
        $(".brands li a").removeClass("current");
        $(this).addClass("current");
        $.History.go(link);
        return false;
    });
}


function getValueFormMutilSelect(form) {
    var arrParam = '';
    var idMselect;
    $(form).find("input,textarea,select,hidden").not("input[type='checkbox']").each(function () {
        idMselect = $(this).attr("name");
        if ($(this).val() != '')
            arrParam += "&" + idMselect + "=" + $(this).val();
    });
    $("a.multiSelect").each(function () {
        idMselect = $(this).attr("id");
        if (getValueMutilSelect(idMselect) != '')
            arrParam += "&" + idMselect + "=" + getValueMutilSelect(idMselect);
    });
    return arrParam;
}

function getValueMutilSelect(selectName) {
    var arrID = '';
    $("input[name='" + selectName + "[]']:checked").each(function () {
        arrID += $(this).val() + ",";
    });
    arrID = (arrID.length > 0) ? arrID.substring(0, arrID.length - 1) : arrID;
    return arrID;
}

function getCurrentNavigation() {
    //set current NAV
    var currentUrl = location.pathname;
    var urlSideNav = currentUrl.substring(currentUrl.indexOf('/') + 1);
    urlSideNav = urlSideNav.substring(urlSideNav.indexOf('/') + 1);
    if (urlSideNav.indexOf('/') > 0)
        urlSideNav = urlSideNav.substring(0, urlSideNav.indexOf('/'));
    var strSelectorSideNav = "#top-menu li a[href$='" + urlSideNav + "']";
    $(strSelectorSideNav).addClass("actived");
}

function resizeListMobile() {
    var max = 0;
    $(".list-mobile li .mobile-c").each(function () {
        if ($(this).height() > max)
            max = $(this).height();
    });
    $(".list-mobile li .mobile-c").height(max);
}

function switchTabs(tabsid) {
    $(".tabs-mobile li a").removeClass();
    $("#link-" + tabsid).addClass("active");
    $(".tabs-details").css("display", "none");
    $("#tabs-" + tabsid).css("display", "block");
}

function regPageLinkAjax() {
    $(".paging a").not(".current").click(function () {
        var link = $(this).attr("href");
        $.History.go(link);
        return false;
    });
}