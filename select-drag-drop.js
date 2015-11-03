$(function () {
    init();
});

function init() {

    $(".selectable").selectable({
        filter: "li",
        start: clearOtherContainers,
        stop: toggleDraggable
    });

    $(".selectable li").draggable({
        helper: draggableHelper,
        drag: onDrag,
        disabled: true
    });

    $(".container").droppable({
        drop: onDrop,
        hoverClass: "drop-hover"
    });
}

function clearOtherContainers() {
    $(".ui-selected").not($(this).find(".ui-selected")).removeClass("ui-selected");
}

function toggleDraggable() {
    $(".selectable li").each(function () {
        var $this = $(this);
        $this.draggable("option", "disabled", !$this.hasClass("ui-selected"));
    });
}

function onDrag(e, ui) {
    console.log(ui.position);
    console.log(ui.offset);
}

function draggableHelper() {
    return $("<ul class='selectable cloned'/>").append($(".ui-selected").clone());
}

function onDrop(e, ui) {
    $(".cloned").remove();

    var $selected = $(".ui-selected").removeClass("ui-selected");
    $(this).find("ul").append($selected);

    reset();
}

function reset() {
    init();
}