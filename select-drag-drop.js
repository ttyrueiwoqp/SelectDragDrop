$(function () {
    init();
});

function init() {

    $(".selectable").selectable({
        filter: "li",
        //start: clearOtherContainers,
        cancel: "li.ui-selected"

    }).sortable({
        helper: sortableHelper,
        connectWith: ".connect",
        cancel: "li:not(.ui-selected)",
        activate: onActivate,
        //start: onStart,
        //stop: onStop
    });
}

function onActivate(e, ui) {
    console.log("activate");
    //console.log($(".ui-selected:not(.cloned):not(.ui-sortable-placeholder)").not(ui.item));
    ui.item.siblings(".ui-selected:not(.ui-sortable-placeholder)").hide();
}

function onStart(e, ui) {
    console.log("start");
}

function clearOtherContainers() {
    $(".ui-selected").not($(this).find(".ui-selected")).removeClass("ui-selected");
}

function sortableHelper(e, ui) {
    console.log("helper");
    return $("<ul class='selectable helper'/>").append(ui.siblings(".ui-selected").addBack().clone().addClass("cloned"));
}

function onStop(e, ui) {
    $(".helper").remove();

    console.log("onBeforeStop");
    console.log(ui.item);
    var $selected = $(".ui-selected").removeClass("ui-selected");
    //$(this).find("ul").append($selected);

    reset();
}

function reset() {
}