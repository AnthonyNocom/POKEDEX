$(document).ready(function() {
    $("#productsortby").change(function() {
        var sortByVal = $("#productsortby option:selected").text();
        $('#productsortbydisplay').text(sortByVal);
        console.log(sortByVal);
        //alert(document.cookie);

        $("#sortbyForm").submit();
        $("#productsortby").val('default');


    });

})