$(function () {
    init();
});

function init() {

    $(".selectable").selectable({
        filter: "li",
        cancel: "li.ui-selected",
        start: clearOtherContainers

    }).sortable({
        connectWith: ".connect",
        helper: sortableHelper,
        activate: onActivate,
        beforeStop: onBeforeStop
    });
}

function clearOtherContainers(e, ui) {
    $(".ui-selected").not($(this).find(".ui-selected")).removeClass("ui-selected");
}

function sortableHelper(e, ui) {
    var $clone = ui.siblings(".ui-selected").addBack().clone().addClass("clone");
    return $("<ul class='selectable'/>").append($clone);
}

function onActivate(e, ui) {
    // Not remove() because jquery-ui assumes only one item is dragged,
    // Removing the rest will cause exception
    // Only remove() on stop
    ui.item.siblings(".ui-selected:not(.ui-sortable-placeholder)").addClass("hidden-sibling").hide();
}

function onBeforeStop(e, ui) {
    var $clone = $(".clone").removeClass("clone");
    ui.item.after($clone).remove();
    $(".hidden-sibling").remove();
    $(".ui-selected").removeClass("ui-selected");
}
