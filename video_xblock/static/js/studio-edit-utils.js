/**
 * Auxiliary functions for studio editor modal's JS.
 */

/**
 * Prepare data to be saved to video xblock.
 */
function fillValues(fields) {
    'use strict';
    var values = {};
    var notSet = []; // List of field names that should be set to default values
    fields.forEach(function(field) {
        if (field.isSet()) {
            values[field.name] = field.val();
        } else {
            notSet.push(field.name);
        }
        // Remove TinyMCE instances to make sure jQuery does not try to access stale instances
        // when loading editor for another block:
        if (field.hasEditor()) {
            field.removeEditor();
        }
    });
    return {values: values, defaults: notSet};
}


/**
 * Display message with results of a performed action (e.g. a transcript manual or automatic upload).
 */
function showStatus(message, type, $statusElement) {
    'use strict';
    var hideIn = 5000; // 5 seconds
    var successClass = 'status-success';
    var errorClass = 'status-error';
    // Only one success message is to be displayed at once
    $('.api-response').empty();
    if (type === 'success') {
        $statusElement.removeClass(errorClass).addClass(successClass);
    } else if (type === 'error') {
        $statusElement.removeClass(successClass).addClass(errorClass);
    }

    $statusElement.show().text(message);
    setTimeout(function() {
        $statusElement.hide();
    }, hideIn);
}