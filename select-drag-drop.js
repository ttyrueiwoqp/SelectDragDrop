$(function () {
    init();
});

function init() {

    $(".select-sortable").selectable({
        filter: "li",
        cancel: "li.ui-selected",
        start: clearOtherContainers

    }).sortable({
        connectWith: ".select-sortable",
        helper: sortableHelper,
        activate: onActivate,
        beforeStop: onBeforeStop
    });
}

function clearOtherContainers(e, ui) {
    $(".ui-selected").not($(this).find(".ui-selected")).removeClass("ui-selected");
}

function sortableHelper(e, ui) {
    var $selectedClone = ui.siblings(".ui-selected").addBack().clone().addClass("ui-selected-clone");
    var $parentClone = ui.parent().clone();
    return $parentClone.empty().append($selectedClone);
}

function onActivate(e, ui) {
    // Not remove() because jquery-ui assumes only one item is dragged
    // Removing the rest will cause exception
    // Only remove() on stop
    ui.item.siblings(".ui-selected:not(.ui-sortable-placeholder)").addClass("ui-selected-hidden-sibling").hide();
}

function onBeforeStop(e, ui) {
    var $selectedClone = $(".ui-selected-clone").removeClass("ui-selected-clone");
    ui.item.after($selectedClone).remove();
    $(".ui-selected-hidden-sibling").remove();
    $(".ui-selected").removeClass("ui-selected");
}
