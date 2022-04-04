/* variables for CRM */
var prodata = [];
var proids = [];
var passdata = [];
var vm = "";
var offtime_startDate,reportrange_startDate,offtime_endDate,reportrange_endDate,staff_payment_startDate,staff_payment_endDate;
/* variables for CRM */
jQuery(document).ready(function(){
  jQuery(".copied_text").hide();
  jQuery(".myall_lang_label").hide();
  jQuery(".label_setting").hide();
  jQuery("#staff_password_update").hide();
  jQuery(".new_cam_ser").hide();
  jQuery(".new_del_ser").hide();
  jQuery(".set_newcam_icon").hide();
  jQuery(".del_btn").hide();
  jQuery(".error_postal_code").hide();
  jQuery("html").niceScroll({cursorborder:"none" ,cursorwidth :"12px",autohidemode:"true"});
  /* FORM VALIDATION METHODS */
  jQuery.validator.addMethod("pattern_price", function (value, element) {
    return this.optional(element) || /^[0-9]\d*(\.\d{1,2})?$/.test(value);
  }, errorobj_please_enter_proper_base_price);
  jQuery.validator.addMethod("pattern_phone", function (value, element) {
    return this.optional(element) || /^\+([0-9]){10,14}[0-9]$/.test(value);
  }, errorobj_please_enter_only_numerics);
  jQuery.validator.addMethod("urlss", function (value, element) {
    return this.optional(element) || /^(http:\/\/|https:\/\/|http:\/\/|https:\/\/)[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/.test(value);
  }, errorobj_enter_valid_url);
  jQuery.validator.addMethod("pattern_zip", function (value, element) {
    return this.optional(element) || /^[a-zA-Z 0-9\-\ ]*$/.test(value);
  }, errorobj_enter_alphabets_only);
  jQuery.validator.addMethod("pattern_name", function (value, element) {
    return this.optional(element) || /^[a-zA-Z/' ]+$/.test(value);
  }, errorobj_enter_alphabets_only);
  /* USER PROFILE ADMIN */
  jQuery.validator.addMethod("user_profile_pattern_password", function (value, element) {
    return this.optional(element) || /^[a-zA-Z0-9 '.'_!%^*~`@()./#&+-]+$/.test(value);
  }, errorobj_enter_only_alphabets_numbers);
  /*  END USER PROFILE */
  jQuery.validator.addMethod("pattern_title", function(value, element) {
    return this.optional(element) || /^[a-zA-Z '.'_@./#&+-]+$/.test(value);
  }, errorobj_enter_alphabets_only);
  jQuery.validator.addMethod("pattern_company_country_code", function(value, element) {
    return this.optional(element) || /^\+[0-9]{1,4}$/.test(value);
  }, errorobj_enter_proper_country_code);
  jQuery.validator.addMethod("pattern_method_name", function (value, element) {
    return this.optional(element) || /^[a-zA-Z/' ]+$/.test(value);
  }, errorobj_enter_alphabets_only);
  jQuery.validator.addMethod("pattern_onlynumber", function (value, element) {
    return this.optional(element) || /^[0-9]+$/.test(value);
  }, errorobj_enter_only_digits);
  jQuery.validator.addMethod("pattern_city_state", function (value, element) {
    return this.optional(element) || /^[a-zA-Z ]+$/.test(value);
  }, errorobj_enter_alphabets_only);
  jQuery.validator.addMethod("pattern_cp", function (value, element) {
    return this.optional(element) || /^[0-9]*$/.test(value);
  }, errorobj_please_enter_only_numeric);
  jQuery.validator.addMethod("pattern_ser_title", function (value, element) {
    return this.optional(element) || /^[a-zA-Z '.'_@./#&+-]+$/.test(value);
  }, "Enter Only Alphabets");
  /* ADMIN PHONE PROFILE */
  var site_url=site_ur.site_url;
  var country_alpha_code = countrycodeObj.alphacode;
  var allowed_country_alpha_code = countrycodeObj.allowed;
  var array = allowed_country_alpha_code.split(",");
  if(allowed_country_alpha_code = ""){
    jQuery("#adminphone,#ct_phone,#userphone,#admin_cus_phno,#phone-number").intlTelInput({
      onlyCountries: array,
      autoPlaceholder: "off",
      utilsScript: site_url+"assets/js/utils.js"
    });
    jQuery(".selected-flag .iti-flag").addClass(country_alpha_code);
    jQuery(".selected-flag").attr("title",countrycodeObj.countrytitle);
  }else{
    jQuery("#adminphone,#ct_phone,#userphone,#admin_cus_phno,#phone-number").intlTelInput({
      autoPlaceholder: "off",
      utilsScript: site_url+"assets/js/utils.js"
    });
    jQuery(".selected-flag .iti-flag").addClass(country_alpha_code);
    jQuery(".selected-flag").attr("title",countrycodeObj.countrytitle);
	
	
  }
  jQuery("#cus-phone-number, #admin_cus_phno").intlTelInput({
    utilsScript: site_url+ "assets/js/utils.js"
  });
  if(allowed_country_alpha_code != ""){
    jQuery("#company_country_code").intlTelInput({
      numberType: "polite",
      onlyCountries: array,
      autoPlaceholder: "off",
      utilsScript: site_url+"assets/js/utils.js"
    });
  } else {
    jQuery("#company_country_code").intlTelInput({
      numberType: "polite",
      autoPlaceholder: "off",
      utilsScript: site_url+"assets/js/utils.js"
    });
  }
  /*  The back to top button  */
  jQuery("body").prepend('<a href="javascript:void(0)" class="cta-back-to-top"></a>');
  var amountScrolled = 300;
  jQuery(window).scroll(function() {
    if ( jQuery(window).scrollTop() > amountScrolled ) {
      jQuery("a.cta-back-to-top").fadeIn("slow");
    } else {
      jQuery("a.cta-back-to-top").fadeOut("slow");
    }
  });
  jQuery("a.cta-back-to-top, a.cta-simple-back-to-top").click(function() {
    jQuery("html, body").animate({ scrollTop: 0 }, 500);
    return false;
  });
  /*  All custom scrollbar  */
  jQuery("#ct-partial-depost_error").hide();
  jQuery("#import_error").hide();
  jQuery("#export_error").hide();
  jQuery(".show_all_labels").hide();
  jQuery(".hide_badges").hide();
  var nice = jQuery("body").niceScroll();
  var nice_left_navs = jQuery(".ct-left-menu").niceScroll();
  var nice_right_details = jQuery(".ct-setting-details").niceScroll();
  /*  scroll to active class service, location, setting  */
  jQuery(".sot-company-details, .sot-general-setting, .sot-appearance-setting, .sot-payment-setting, .sot-email-setting, .sot-email-template, .sot-sms-reminder, .sot-sms-template, .sot-frequently-discount, .sot-promocode, .sot-labels, .sot-form-fields").on("click", function (e) {
    var current_url = window.location.href;
    if(current_url.indexOf("staff-dashboard.php") != -1){}else{
      jQuery("html, body").stop().animate({ "scrollTop": jQuery(".ct-setting-details").offset().top - 115 }, 500, "swing",  function () {});
    }
  });
  /*  reject appointment reason popover  */
  jQuery("#ct-reject-appointment").popover({
    html: true,
    content: function () {
      return jQuery("#popover-reject-appointment").html();
    }
  });
  jQuery("#ct-reject-appointment-cal-popup").popover({
    html: true,
    content: function () {
      var id = jQuery(this).attr("data-bkid");
      return jQuery("#popover-reject-appointment-cal-popup").html();
    }
  });
  /*  delete appointment in modal window  */
  jQuery("#ct-delete-appointment-cal-popup").popover({
    html: true,
    content: function () {
       return jQuery("#popover-delete-appointment-cal-popup").html();
    }
  });
  jQuery("#edit-ct-reject-appointment").popover({
    html: true,
    content: function () {
      return jQuery("#edit-popover-reject-appointment").html();
    }
  });
  /*  delete appointment in modal window  */
  jQuery("#edit-ct-delete-appointment").popover({
    html: true,
    content: function () {
      return jQuery("#edit-popover-delete-appointment").html();
    }
  });
    
  /*  add new staff button and popover  */
  jQuery("#ct-add-new-staff").popover({
    html: true,
    content: function () {
      return jQuery("#popover-content-wrapper").html();
    }
  });
  
  jQuery('[data-toggle="popover_reccurence"]').popover({
    placement: "left",
    html: true,
    content: function () {
      jQuery("#ct-close-popover-delete-reccurence").trigger("click");
      return jQuery(this).next("#popover-delete-reccurence").html();
    }
  });
  jQuery( "#sortable-services, #sortable-services-units" ).sortable({ handle: ".fa-th-list" });
  /*  add new category button and popover  */
  jQuery("#ct-add-new-category").popover({
    html: true,
    content: function () {
      return jQuery("#popover-content-wrapper").html();
    }
  });
  /*  delete service addon popover  */
  jQuery("#ct-delete-service-addon").popover({
    html: true,
    content: function () {
      return jQuery("#popover-delete-service-addon").html();
    }
  });
  /*  delete service unit popover  */
  jQuery("#ct-delete-service-unit").popover({
    html: true,
    content: function () {
      return jQuery("#popover-delete-service-unit").html();
    }
  });
  /*  for add breaks in staff   */
  jQuery("#ct-add-staff-breaks").click(function () {
    jQuery("#ct-add-break-ul").append("");
  });
  jQuery("#sortable-services, #sortable-services-units").sortable({handle: ".fa-th-list"});
  jQuery("#sortable-service-list").sortable();
  /*  color tag for service */
  jQuery(".demo").each(function () {
    jQuery(this).minicolors({
      control: jQuery(this).attr("data-control") || "hue",
      defaultValue: jQuery(this).attr("data-defaultValue") || "",
      format: jQuery(this).attr("data-format") || "hex",
      keywords: jQuery(this).attr("data-keywords") || "",
      inline: jQuery(this).attr("data-inline") === "true",
      letterCase: jQuery(this).attr("data-letterCase") || "lowercase",
      opacity: jQuery(this).attr("data-opacity"),
      position: jQuery(this).attr("data-position") || "bottom left",
      change: function (value, opacity) {
        if (!value) return;
        if (opacity) value += ", " + opacity;
        if (typeof console === "object") {}
      },
      theme: "bootstrap"
    });
  });
  /*jQuery(".selectpicker").selectpicker({
    container: "body",
    size: '10'
  }); */
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
    jQuery(".selectpicker").selectpicker("mobile");
  }
  jQuery(".ct-show-hide-checkbox").change(function () {
    var toggle_id = jQuery(this).attr("id");
    jQuery(".mycollapse_" + toggle_id).toggle("blind", {direction: "vertical"}, 1000);
  });
  /*  for add breaks in staff   */
  jQuery("#ct-add-staff-breaks").click(function () {
    jQuery("#ct-add-break-ul").append("<li>" + jQuery(".ct-add-new-break-li").html() + "</li>");
  });
  /* *****   settings > General settings  ************ */
  /*  for toggle medium enable disable collapse  */
  jQuery(".cta-toggle-checkbox").change(function () {
    var toggle_id = jQuery(this).attr("id");
    if(toggle_id == "patial-deposit"){}else{
      jQuery(".mycollapse_" + toggle_id).toggle("blind", {direction: "vertical"}, 1000);            
    }
  });
  /*  for toggle medium enable disable collapse  */
  jQuery(".cta-toggle-checkbox").change(function () {     
    var toggle_id = jQuery(this).attr("id");        
    if(toggle_id == "patial-deposit"){        
      if(jQuery(this).prop("checked")==true){     
        if(payment_status == "off"){             
          jQuery("#ct-partial-depost_error").show();  
          jQuery(this).attr("checked",false);
          jQuery(this).parent().prop("className","toggle btn btn-danger btn-sm off");
        }else{                  
          jQuery(".mycollapse_" + toggle_id).toggle("blind", {direction: "vertical"}, 1000);
        }            
      }else{               
        jQuery("#ct-partial-depost_error").hide();     
        jQuery(".mycollapse_" + toggle_id).fadeOut();   
      }      
    }   
  });
  jQuery('input[type="radio"]').click(function () {
    if (jQuery(this).attr("value") == "Percentage") {
      jQuery(".ct-tax-percent").show();
    } else if (jQuery(this).attr("value") == "Flat-Fee") {
      jQuery(".ct-tax-percent").hide();
    }
  });
  jQuery('[data-toggle="tooltip"]').tooltip({"placement": "right"});
  /* *****   settings > Appearance settings  ************ */
  jQuery("ct-primary-color").minicolors();
  /* *****   settings > discount coupons  ************ */
  jQuery(".delete-promocode").popover({
    html: true,
    content: function () {
      var id = jQuery(this).attr("data-id");
      return jQuery("#popover-delete-promocode" + id).html();
    }
  });
  jQuery(".delete-spec-off").popover({
    html: true,
    content: function () {
      var id = jQuery(this).attr("data-id");
      return jQuery("#popover-delete-spec-off" + id).html();
    }
  });
  /*  data table for export data with excel, csv, pdf  */
  jQuery("#payments-details").DataTable({
    dom: "lfrtipB",
    order: [[0, "desc"]],
    buttons: [
      "excelHtml5",
      "pdfHtml5"
    ]
  });
  jQuery("#recurrence-details").DataTable({
    dom: "lfrtipB",
    order: [[2, "desc"]],
    buttons: [{
      extend: "excelHtml5",
      exportOptions: {
        columns: [ 0, 1]
      }
    },{
      extend: "pdfHtml5",
      exportOptions: {
        columns: [ 0, 1]
      }
    },]
  });
  jQuery("#staff-payments-details").DataTable({
    dom: "lfrtipB",
    order: [[0, "desc"]],
    buttons: [{
      extend: "excelHtml5",
      exportOptions: {
        columns: [ 0, 1, 2 ,3 ,4 ,5 ,6 ]
      }
    },{
      extend: "pdfHtml5",
      exportOptions: {
        columns: [ 0, 1, 2 ,3 ,4 ,5 ,6 ]
      }
    },]
  });
  jQuery("#user-profile-booking-table").DataTable({
    dom: "lfrtipB",
    order: [[0, "desc"]],
    buttons: [{
      extend: "excelHtml5",
      exportOptions: {
       columns: [ 0, 1, 2 ]
      }
    },{
      extend: "pdfHtml5",
      exportOptions: {
       columns: [ 0, 1, 2 ]
      }
    },]
  });
  
  jQuery("#ct-promocode-list").DataTable();
  jQuery("#staff-payments-adding").DataTable();
  jQuery("#ct-special-offer-list").DataTable();
  responsive: true
  /*  export date range picker  */
  function staff_past(start, end) {
    reportrange_startDate = start;
    reportrange_endDate = end;
    jQuery("#reportrange-staff-past span").html(start.format("MMMM D, YYYY") + " - " + end.format("MMMM D, YYYY"));
  }
  jQuery("#reportrange-staff-past").daterangepicker({
    ranges: {
    }
  }, staff_past);
  
  function cbb(start, end) {
    reportrange_startDate = start;
    reportrange_endDate = end;
    jQuery("#reportrange span").html(start.format("MMMM D, YYYY") + " - " + end.format("MMMM D, YYYY"));
  }
  cbb(moment().subtract(29, "days"), moment());
  jQuery("#reportrange").daterangepicker({
    ranges: {
      "Today": [moment(), moment()],
      "Yesterday": [moment().subtract(1, "days"), moment().subtract(1, "days")],
      "Last 7 Days": [moment().subtract(6, "days"), moment()],
      "Last 30 Days": [moment().subtract(29, "days"), moment()],
      "This Month": [moment().startOf("month"), moment().endOf("month")],
      "Last Month": [moment().subtract(1, "month").startOf("month"), moment().subtract(1, "month").endOf("month")]
    }
  }, cbb);
  function cb(start, end) {
    staff_payment_startDate = start;
    staff_payment_endDate = end;
    jQuery("#reportrange-staff-payment span").html(start.format("MMMM D, YYYY") + " - " + end.format("MMMM D, YYYY"));
  }
  cb(moment().subtract(29, "days"), moment());
  jQuery("#reportrange-staff-payment").daterangepicker({
    ranges: {
      "Today": [moment(), moment()],
      "Yesterday": [moment().subtract(1, "days"), moment().subtract(1, "days")],
      "Last 7 Days": [moment().subtract(6, "days"), moment()],
      "Last 30 Days": [moment().subtract(29, "days"), moment()],
      "This Month": [moment().startOf("month"), moment().endOf("month")],
      "Last Month": [moment().subtract(1, "month").startOf("month"), moment().subtract(1, "month").endOf("month")]
    }
  }, cb);
  /*  for staff off time  */
  function cbbb(start, end) {
    offtime_startDate = start;
    offtime_endDate = end;
    jQuery("#offtime-daterange span").html(start.format("MM/DD/YYYY h:mm A") + " - " + end.format("MM/DD/YYYY h:mm A"));
  }
  cbbb(moment().subtract(29, "days"), moment());
  jQuery("#offtime-daterange").daterangepicker({
    timePicker: true,
    timePickerIncrement: 30,
    locale: {
      format: "MM/DD/YYYY h:mm A"
    }
  }, cbbb);
  /* booking information information export details */
  jQuery("#booking-info-table").DataTable({
    dom: "lfrtipB",
    buttons: [{
      extend: "copyHtml5",
      exportOptions: {
        columns: [ 0, 1, 2 ,3 ,4 ,5 ,6 ]
      }
    },{
      extend: "csvHtml5",
	  charset: "UTF-16LE",
      exportOptions: {
        columns: [ 0, 1, 2 ,3 ,4 ,5 ,6 ]
      }
    },{
      extend: "excelHtml5",
      exportOptions: {
        columns: [ 0, 1, 2 ,3 ,4 ,5 ,6 ]
      }
    },{
      extend: "pdfHtml5",
      exportOptions: {
        columns: [ 0, 1, 2 ,3 ,4 ,5 ,6 ]
      }
    },]
  });
  /* staff member information export details */
  jQuery("#staff-info-table").DataTable({
    dom: "lfrtipB",
    buttons: [
      "copyHtml5",
      "excelHtml5",
      "csvHtml5",
      "pdfHtml5"
    ]
  });
  /* services information export details */
  jQuery("#services-info-table").DataTable({
    dom: "lfrtipB",
    buttons: [
      "copyHtml5",
      "excelHtml5",
      "csvHtml5",
      "pdfHtml5"
    ]
  });
  /* category information export details */
  jQuery("#category-info-table").DataTable({
    dom: "lfrtipB",
    buttons: [
      "copyHtml5",
      "excelHtml5",
      "csvHtml5",
      "pdfHtml5"
    ]
  });
  /*  registered customers booking details page  */
  jQuery("#registered-client-booking-details").DataTable({
    dom: "frtipB",
    buttons: [
      "copyHtml5",
      "excelHtml5",
      "csvHtml5",
      "pdfHtml5"
    ]
  });
  /*  registered customers listing page  */
  jQuery("#registered-client-table").DataTable({
    dom: "lfrtipB",
    buttons: [{
      extend: "copyHtml5",
      exportOptions: {
        columns: [ 0, 1 ,2 ]
      }
    },{
      extend: "csvHtml5",
      exportOptions: {
        columns: [ 0, 1 ,2 ]
      }
    },{
      extend: "excelHtml5",
      exportOptions: {
        columns: [ 0, 1 ,2 ]
      }
    },{
      extend: "pdfHtml5",
      exportOptions: {
        columns: [ 0, 1 ,2 ]
      }
    },]
  });
  /*  guest customers listing page  */
  jQuery("#guest-client-table").DataTable({
    dom: "lfrtipB",
    buttons: [{
      extend: "copyHtml5",
      exportOptions: {
        columns: [ 0, 1, 2 ]
      }
    },{
      extend: "csvHtml5",
      exportOptions: {
        columns: [ 0, 1, 2 ]
      }
    },{
      extend: "excelHtml5",
      exportOptions: {
        columns: [ 0, 1, 2 ]
      }
    },{
      extend: "pdfHtml5",
      exportOptions: {
        columns: [ 0, 1, 2 ]
      }
    },]
  });
  /*  guest customers booking details page  */
  jQuery("#guest-client-booking-details").DataTable({
    dom: "frtipB",
    buttons: [
      "copyHtml5",
      "excelHtml5",
      "csvHtml5",
      "pdfHtml5"
    ]
  });
  /*  delete service image popover  */
  jQuery("#ct-remove-service-image").popover({
    html: true,
    content: function () {
      return jQuery("#popover-ct-remove-service-image").html();
    }
  });
  /*  delete member image popover  */
  jQuery("#ct-remove-member-image").popover({
    html: true,
    content: function () {
      return jQuery("#popover-ct-remove-member-image").html();
    }
  });
  /*  delete customer image popover  */
  jQuery("#ct-remove-customer-image").popover({
    html: true,
    content: function () {
      return jQuery("#popover-ct-remove-customer-image").html();
    }
  });
  /*  delete new customer image popover  */
  jQuery("#ct-remove-new-customer-image").popover({
    html: true,
    content: function () {
      return jQuery("#popover-ct-remove-new-customer-image").html();
    }
  });
  /*  delete company logo popover  */
  jQuery("#ct-remove-company-logo").popover({
    html: true,
    content: function () {
      return jQuery("#popover-ct-remove-company-logo").html();
    }
  });
  jQuery('[data-toggle="popover"]').popover({
    placement: "left",
    html: true,
    content: function () {
      //jQuery("#ct-close-popover-delete-service").trigger("click");
      return jQuery(this).next("#popover-delete-servicess").html();
    }
  });
  jQuery('[data-toggle="popover_sent_req"]').popover({
    placement: "left",
    html: true,
    content: function () {
      jQuery("#ct-close-popover-request-recurrence").trigger("click");
      return jQuery(this).next("#popover-request-recurrence").html();
    }
  });
  /*  FUNRTION FOR SERCVICES */
  jQuery("#sortable-services").sortable({
    update: function () {
      var i = 1;
      var pos = [];
      var ids = [];
      jQuery(".mysortlist").each(function () {
        pos.push(i++);
        ids.push(jQuery(this).attr("data-id"));
      });
      jQuery(".ct-loading-main").show();
      jQuery.ajax({
        type: "post",
        data: { "pos": pos, "ids": ids },
        url: ajax_url + "service_ajax.php",
        success: function (res) {
          jQuery(".ct-loading-main").hide();
        }
      });
    }
  });
  /*  FUNCTION FOR SERCVICES_methods */
  jQuery("#sortable-services-methods").sortable({
    update: function () {
      var i = 1;
      var pos = [];
      var ids = [];
      jQuery(".mysortlist_methods").each(function () {
        pos.push(i++);
        ids.push(jQuery(this).attr("data-id"));
      });
      jQuery(".ct-loading-main").show();
      jQuery.ajax({
        type: "post",
        data: { "pos": pos, "ids": ids },
        url: ajax_url + "service_method_ajax.php",
        success: function (res) {
          jQuery(".ct-loading-main").hide();
        }
      });
    }
  });
  /*  FUNCTION FOR SERCVICES_units */
  jQuery("#sortable-services-unit").sortable({
    update: function () {
      var i = 1;
      var pos = [];
      var ids = [];
      jQuery(".mysortlist_units").each(function () {
        pos.push(i++);
        ids.push(jQuery(this).attr("data-id"));
      });
      jQuery(".ct-loading-main").show();
      jQuery.ajax({
          type: "post",
          data: { "pos": pos, "ids": ids },
          url: ajax_url + "service_method_units_ajax.php",
          success: function (res) {
            jQuery(".ct-loading-main").hide();
          }
      });
    }
  });
  /* LOAD ALL METHODS FROM DB IN UL */
  var str = window.location.pathname;
  var last = str.substring(str.lastIndexOf("/") + 1, str.length);
  if (last == "service-manage-calculation-methods.php") {
    jQuery(".ct-loading-main").show();
    jQuery(".myservicetitleformethod").html("" + localStorage["title"]);
    jQuery(".myhiddenserviceid").val("" + localStorage["serviceid"]);
    jQuery.ajax({
      type: "post",
      data: { "service_id": localStorage["serviceid"], "getallservicemethod": 1 },
      url: ajax_url + "service_method_ajax.php",
      success: function (res) {
        jQuery(".myservicemethodload").html(res);
        jQuery(".ct-loading-main").hide();
      }
    });
  }
  /* SERVICE METHODS UNITS TITLE SET AND LOAD ALL UNITS */
  var str = window.location.pathname;
  var last = str.substring(str.lastIndexOf("/") + 1, str.length);
  if (localStorage["title"] == "") {
    window.location.replace(link_url + "services.php");
  }
  if (last == "service-manage-unit-price.php") {
    jQuery(".mydesign-setting-button").hide();
    jQuery(".myservicetitleformethod").html("" + localStorage["title"]);
    jQuery(".mydesign-setting-button").hide();
    jQuery(".mymethodtitleforunit").html("" + localStorage["title"] + " - " + localStorage["method_title"]);
    jQuery(".mymethodtitleforunitbrcr").html(localStorage["method_title"]);
    jQuery(".ct-loading-main").show();
    jQuery.ajax({
      type: "post",
      data: { "service_id": localStorage["serviceid"], "method_id": localStorage["methodid"], "setfrontdesign": 1 },
      url: ajax_url + "service_method_units_ajax.php",
      success: function (res) {
        jQuery(".ct-loading-main").hide();
        jQuery(".mydesign-setting-button").show();
        var final_menu_popup = res.slice(0, -1);
        jQuery(".mymodalbody").html(final_menu_popup);
      }
    });
    jQuery.ajax({
      type: "post",
      data: { "service_id": localStorage["serviceid"], "method_id": localStorage["methodid"], "getservice_method_units": 1 },
      url: ajax_url + "service_method_units_ajax.php",
      success: function (res) {
        jQuery(".myservice_method_unitload").html(res);
      }
    });
    jQuery.ajax({
      type: "post",
      data: { "service_id": localStorage["serviceid"], "method_id": localStorage["methodid"], "checkunits_ofservice_methods": 1 },
      url: ajax_url + "service_method_units_ajax.php",
      success: function (res) {
        if (jQuery(".mymodalbody").html() == "") {
          jQuery(".mydesign-setting-button").show();
          jQuery(".mymodalbody").html(res);
        }
        jQuery(".ct-loading-main").hide();
      }
    });
  }
  /* ADDONS SERVICE PAGE */
  jQuery(".mymessage_assign_design_addon").hide();
  jQuery(".mymessage_assign_design_service").hide();
  jQuery( "#sortable-addons-services" ).sortable({ handle: ".fa-th-list" });
  /* CHANGE THE SORTIN POSITION OF THE ADDONS */
  /* SORTABLE FUNRTION FOR SERCVICES */
  jQuery("#sortable-addons-services").sortable({
    update: function () {
      var i = 1;
      var pos = [];
      var ids = [];
      jQuery(".mysortlistaddons").each(function () {
        pos.push(i++);
        ids.push(jQuery(this).attr("data-id"));
      });
      jQuery(".ct-loading-main").show();
      jQuery.ajax({
        type: "post",
        data: { "pos": pos, "ids": ids },
        url: ajax_url + "service_addons_ajax.php",
        success: function (res) {
          jQuery(".ct-loading-main").hide();
        }
      });
    }
  });
  /* SET TITLE FOR UNIT PAGE */
  jQuery(".mybtnfrontdesignaddons").hide();
  var str = window.location.pathname;
  var last = str.substring(str.lastIndexOf("/") + 1, str.length);
  if (last == "service-extra-addons.php") {
    jQuery(".myextraservice_addon").html("" + localStorage["title"]);
    jQuery(".myextraservice_addontitle").html(errorobj_manage_addons_service);
    jQuery.ajax({
      type: "post",
      data: { "service_id": localStorage["serviceid"], "getservice_addons": 1 },
      url: ajax_url + "service_addons_ajax.php",
      success: function (res) {
        var lastchar = res.substr(res.length - 1);
        if(lastchar == 0){
          jQuery(".mybtnfrontdesignaddons").hide();
        }
        else{
          jQuery(".mybtnfrontdesignaddons").show();
        }
        str = res.slice(0, -1);
        jQuery(".myservice_addon_loader").append(str);
      }
    });
  }
  /* NOTIFICATION CODE */
  /* LOAD ALL NOTIFICATION */
  jQuery("#ct-notifications").click(function () {
    jQuery(".ct-load-bar").show();
    jQuery(".myloadednotification").hide();
    jQuery("#ct-notification-container").removeAttr("style");
    jQuery.ajax({
      type: "post",
      data: { getallnotification: 1 },
      url: ajax_url + "my_appoint_ajax.php",
      success: function (res) {
        jQuery(".ct-load-bar").hide();
        jQuery(".myloadednotification").show();
        if(jQuery.trim(res) != ""){
          jQuery(".myloadednotification").html(res);
        } else {
          jQuery(".myloadednotification").html("<li>"+errorobj_sorry_no_notification+"</li>");
        }
      }
    });
    jQuery(".ct-notifications-inner").addClass("visible");
  });
  jQuery("#ct-close-notifications").click(function () {
    jQuery(".ct-notifications-inner").removeClass("visible");
  });
  jQuery( document ).on( "keydown", function ( e ) {
    if ( e.keyCode === 27 ) {
      jQuery(".ct-notifications-inner").removeClass("visible");
    }
  });
  /* service add form validation */
  jQuery("#addservice_form").validate({
    rules: {
      txtcolor: {required: true},
      txtservicetitle: {required: true}
    },
    messages: {
      txtcolor: {required: errorobj_please_enter_color_code},
      txtservicetitle: {required: errorobj_please_enter_service_title}
    }
  });
  jQuery(".ct-email-settings").validate({
    rules: {
      admin_optional_email: {email: true},
      ct_email_sender_address: {email: true}
    },
    messages: {
      admin_optional_email: {required: errorobj_please_enter_email},
      ct_email_sender_address: {required: errorobj_please_enter_email}
    }
  });
  /*  Use for Tax/vat  */
  jQuery(".tax_vat_radio").click(function () {
    if (jQuery(this).val() == "P") {
      jQuery(".ct-tax-percent").addClass("fa fa-percent");
    }
    if (jQuery(this).val() == "F") {
      jQuery(".ct-tax-percent").removeClass("fa fa-percent");
    }
  });
  /*  Use for partial deposite */
  jQuery(".partial_radio").click(function(){
    if(jQuery(this).val()=="P"){
      jQuery(".ct-partial-deposit-percent").addClass("fa fa-percent");
    }
    if(jQuery(this).val()=="F"){
      jQuery(".ct-partial-deposit-percent").removeClass("fa fa-percent");
    }
  });
  /* SETTINGS PAGE COMPANY VALIDATION */
  /*  Validation for setting Business Details  */
  jQuery("#business_setting_form").validate({
    rules: {
      ct_company_name: {required: true, maxlength : 50},
      ct_company_email: {required: true},
      ct_company_address: {required: true},
      ct_company_city: {required: true},
      ct_company_state: {required: true},
      ct_company_zip: {required: true, minlength: 3, maxlength: 7},
      ct_company_country: {required: true},
      ct_company_country_code: {pattern_company_country_code: true},
      ct_company_phone: {minlength: 5, maxlength: 14,number:true}
    },
    messages: {
      ct_company_name: {required: errorobj_please_enter_name,maxlength : "Please Enter Below 36 Characters"},
      ct_company_email: errorobj_please_enter_email,
      ct_company_address: errorobj_please_enter_address,
      ct_company_city: errorobj_please_enter_city,
      ct_company_state: errorobj_please_enter_state,
      ct_company_zip: { required: errorobj_please_enter_zipcode, minlength: errorobj_please_enter_minimum_3_chars, maxlength: errorobj_please_enter_only_7_chars_maximum },
      ct_company_country: errorobj_please_enter_country,
      ct_company_country_code: {pattern_company_country_code: errorobj_please_enter_valid_country_code},
      ct_company_phone: {minlength:errorobj_please_enter_minimum_5_digits,maxlength:errorobj_please_enter_maximum_14_digits,number : errorobj_please_enter_only_numerics}
    }
  });
  /*  cancel booking popover  */
  jQuery(".cancel_appointment").popover({
    html : true,
    content: function() {
      var id = jQuery(this).attr("data-id");
      return jQuery("#popover-user-cancel-appointment"+id).html();
    }
  });
  jQuery("#btn-change-pass").click(function () {
    jQuery(".ct-change-password").show( "blind", {direction: "vertical"}, 1000 );
    jQuery("#btn-change-pass").hide();
  });
  jQuery.ajax({
    type : "post",
    data: { check_for_option : 1 },
    url : ajax_url+"admin_profile_ajax.php",
    success : function(res){
      if(jQuery.trim(res) != ""){
        jQuery(".check_options_left_toset").html(errorobj_please_fill_all_the_company_informations_and_add_some_services_and_addons);
        jQuery(".all_ok").hide();
      } else {
        jQuery(".necessary_option_check").hide();
        jQuery(".all_ok").show();
      }
    }
  });
  jQuery(".email_template_form").validate({
    rules: { email_message: {required: true} },
    messages: { email_message: {required: errorobj_please_enter_email_message} }
  });
  jQuery('[data-toggle="popover"]').popover({
    placement: "left",
    html: true,
    content: function () {
      return jQuery(this).next("#popover-delete-customerss").html();
    }
  });
  /* staff availability time */
  if(localStorage["trigger_user"] != ""){
    jQuery(".staff_c_"+localStorage["trigger_user"]).trigger("click");
  }
  else{
    jQuery(".staff_1").trigger("click"); 
  }
  jQuery("[data-toggle='toggle']").bootstrapToggle("destroy");
  jQuery("[data-toggle='toggle']").bootstrapToggle();
  
  /** For Resetting Color-Scheme **/
  /* for resetting Color Scheme primary color and Admin Area Color Scheme primary color */
  jQuery("[name = ct_primary_color]").on("focus", function() {
    jQuery("[name = ct_primary_color]").val();
  });
  jQuery("[name = ct_primary_color_admin]").on("focus", function() {
    jQuery("[name = ct_primary_color_admin]").val();
  });

  /* for resetting Color Scheme secondary color and Admin Area Color Scheme secondary color*/
  jQuery("[name = ct_secondary_color]").on("focus", function() {
    jQuery("[name = ct_secondary_color]").val();
  });
  jQuery("[name = ct_secondary_color_admin]").on("focus", function() {
    jQuery("[name = ct_secondary_color_admin]").val(secondary_color_admin);
  });
  /* for resetting Color Scheme text color and Admin Area Color Scheme text color*/
  jQuery("[name = ct_text_color]").on("focus", function() {
    jQuery("[name = ct_text_color]").val();
  });
  jQuery("[name = ct_text_color_admin]").on("focus", function() {
    jQuery("[name = ct_text_color_admin]").val(text_color_admin);
  });
  /* for resetting Color Scheme Text Color on bg */
  jQuery("[name = ct_text_color_on_bg]").on("focus", function() {
    jQuery("[name = ct_text_color_on_bg]").val();
  });
  jQuery("#reset_color").on("click", function(event) {
    /* for resetting Color Scheme primary color and Admin Area Color Scheme primary color */
    jQuery("[name = ct_primary_color]").minicolors("value","#003b46");
    jQuery("[name = ct_primary_color]").val("#003b46");  
    jQuery("[name = ct_primary_color_admin]").minicolors("value","#003b46");
    jQuery("[name = ct_primary_color_admin]").val("#003b46");
    /* for resetting Color Scheme secondary color and Admin Area Color Scheme secondary color*/
    jQuery("[name = ct_secondary_color_admin]").minicolors("value","#187d90");
    jQuery("[name = ct_secondary_color_admin]").val("#187d90");
    jQuery("[name = ct_secondary_color]").minicolors("value","#187d90");
    jQuery("[name = ct_secondary_color]").val("#187d90");
    /* for resetting Color Scheme text color and Admin Area Color Scheme text color*/
    jQuery("[name = ct_text_color]").minicolors("value","#666666");
    jQuery("[name = ct_text_color]").val("#666666"); 
    jQuery("[name = ct_text_color_admin]").minicolors("value","#ffffff");
    jQuery("[name = ct_text_color_admin]").val("#ffffff");
    /* for resetting Color Scheme Text Color on bg */
    jQuery("[name = ct_text_color_on_bg]").minicolors("value","#ffffff");
    jQuery("[name = ct_text_color_on_bg]").val("#ffffff"); 
  });
  /*** Add extensions  ***/
  payment_currency_check_js();
});
/* All Popover Close button click Event */
jQuery(document).on("click", "#ct-close-reject-appointment,#ct-close-reject-appointment-cal-popup,#edit-ct-close-reject-appointment,#edit-ct-close-del-appointment,#ct-close-popover-member-image,#ct-close-popover-customer-image,#ct-close-popover-new-customer-image,#ct-close-popover-company-logo,#ct-close-popover-request-recurrence,#ct-close-user-cancel-appointment,#ct-close-popover-customerss,#ct-close-del-appointment", function () {
  jQuery(".popover").fadeOut();
});
jQuery(document).on('click', '#ct-close-popover-salon-logoctsi', function(){			
		jQuery('#ct-remove-company-logo-new').trigger('click');
});
jQuery(document).on('click', '#ct-close-popover-delete-breaks', function(){			
		var user_id = jQuery(this).data('break_id');
		jQuery('#ct-delete-staff-break'+user_id).trigger('click');
});
jQuery(document).on('click', '#ct-close-reject-appointment-cal-popup', function(){      
    jQuery('#ct-reject-appointment-cal-popup').trigger('click');
});
jQuery(document).on('click', '#ct-close-popover-delete-staff', function(){      
    jQuery('#ct-delete-staff-member').trigger('click');
});
jQuery(document).on('click', '#ct-close-popover-staff-image', function(){      
    jQuery('#ct-remove-staff-imagepppp2').trigger('click');
});
jQuery(document).on('click', '#ct-close-del-appointment-cal-popup', function(){      
 jQuery('#ct-delete-appointment-cal-popup').trigger('click');
});
 jQuery(document).on('click', '#ct-close-popover-delete-reccurence', function(){      
 jQuery('#ct-close-popover-delete-reccurencesss').trigger('click');
});
jQuery(document).on('click', '#ct-close-popover-service-image', function(){  
  var user_id = jQuery(this).data('service_id');
  jQuery('#ct-remove-service-imagepcls'+user_id).trigger('click');
});
jQuery(document).on('click', '#ct-close-popover-delete-promocode', function(){      
 jQuery('#ct-delete-promocode').trigger('click');
});
jQuery(document).on('click', '#ct-close-popover-delete-specialoffer', function(){      
 jQuery('#ct-delete-special-off').trigger('click');
});
jQuery(document).on('click', '#ct-close-popover-delete-service-method', function(){
var user_id = jQuery(this).data('servicemethodid');
 jQuery('#ct-delete-service-method'+user_id).trigger('click');
});
jQuery(document).on('click', '#ct-close-popover-delete-service-unit', function(){
var user_id = jQuery(this).data('service_method_unitid');
 jQuery('#ct-delete-service-unit'+user_id).trigger('click');
});
jQuery(document).on('click', '#ct-close-popover-service-addon-image', function(){
var user_id = jQuery(this).data('pcaolid');
 jQuery('#ct-remove-service-addons-imagepcaol'+user_id).trigger('click');
});
jQuery(document).on('click', '#ct-close-popover-delete-service-addon', function(){
var user_id = jQuery(this).data('serviceaddonid');
 jQuery('#ct-delete-service-addon'+user_id).trigger('click');
});
jQuery(document).on('click', '#ct-close-popover-delete-service', function(){
var user_id = jQuery(this).data('serviceid');
 jQuery('#ct-delete-service'+user_id).trigger('click');
});
var check_update_if_btn = "0";
var multipleqty_for_addon = "N";
/*  service addons list selection  */
jQuery(document).on("click",".insert_id",function() {
  jQuery(".cta-addons-dropdown").toggle( "blind", {direction: "vertical"}, 1000 );
});
jQuery(document).on("click",".update_id",function() {
  var id = jQuery(this).attr("data-id");
  jQuery(".display_update_"+id).toggle( "blind", {direction: "vertical"}, 1000 );
});
jQuery(document).on("click",".select_addons",function() {
  var imagename = jQuery(this).attr("data-name");
  var p_i_name = jQuery(this).attr("data-p_i_name");
  var id = jQuery(this).attr("data-id");
  jQuery("#addonid_"+id).html(jQuery(this).html());
  jQuery("#addonid_"+id).attr("data-name",imagename);
  jQuery("#addonid_"+id).attr("data-p_i_name",p_i_name);
  jQuery(".display_update_"+id).hide( "blind", {direction: "vertical"}, 500 );
});
jQuery(document).on("click",".select_addons_insert",function() {
  var imagename = jQuery(this).attr("data-name");
  var p_i_name = jQuery(this).attr("data-p_i_name");
  jQuery("#cta_selected_addon").html(jQuery(this).html());
  jQuery("#cta_selected_addon").attr("data-name",imagename);
  jQuery("#cta_selected_addon").attr("data-p_i_name",p_i_name);
  jQuery("#cta_selected_addon").attr("data-p_i_name",p_i_name);
  jQuery(".display_insert").hide( "blind", {direction: "vertical"}, 500 );
});
/* ****  header jquery  ********* */
/* custom form fields min and max length */
jQuery(document).on("click",".ct-addition-btn",function() {
  var inputclass = jQuery(this).attr("data-info");
  jQuery("."+inputclass).val(parseInt(jQuery("."+inputclass).val(), 10) + 1);
});
jQuery(document).on("click",".ct-subtraction-btn",function() {
  var inputclass = jQuery(this).attr("data-info");
  if(parseInt(jQuery("."+inputclass).val(), 10) - 1 <= 0){
    jQuery("."+inputclass).val(0);
  } else {
    jQuery("."+inputclass).val( parseInt(jQuery("."+inputclass).val(), 10) - 1);
  }
});
jQuery(document).on("click","#ct-add-new-service",function() {
  jQuery("html, body").stop().animate({"scrollTop": jQuery(".new-service-scroll, .new-addon-scroll").offset().top - 115}, 2000, "swing", function () {});
});
/*  menu auto hide in mobile when open a menu  */
jQuery(document).on("click", ".navbar-collapse.in", function (e) {
  if (jQuery(e.target).is("a")) {
    jQuery(this).collapse("hide");
  }
});
/*  manage form fields min max counting  */
jQuery(document).on("click", ".add", function (e) {
  var $qty = jQuery(this).closest(".ct-min-max").find(".qty");
  var currentVal = parseInt($qty.val());
  if (!isNaN(currentVal)) {
    $qty.val(currentVal + 1);
  }
});
jQuery(document).on("click", ".minus", function (e) {
  var $qty = jQuery(this).closest(".ct-min-max").find(".qty");
  var currentVal = parseInt($qty.val());
  if (!isNaN(currentVal) && currentVal > 0) {
    $qty.val(currentVal - 1);
  }
});
jQuery(document).on("click", ".fc-day-grid-event", function (e) {
  jQuery("#booking-details-calendar").css("display", "block");
});
jQuery(document).ready(function () {
  var ajaxurl = ajax_url;
  var time_format_values=times.time_format_values;
  if(time_format_values==24){
    var tymfrmt="H:mm";
  }else{
    var tymfrmt="h:mm a";
  }
  /* SET LANGUAGE TRANSLATE*/
  var set_language = language_new.selected_language;  
  var today_nn = titles.selected_today;
  var month_nn = titles.selected_month;
  var week_nn = titles.selected_week;
  var day_nn = titles.selected_day;
  /* SET LANGUAGE TRANSLATE*/
  var d = new Date();
  var month = d.getMonth() + 1;
  var day = d.getDate();
  var curdate = d.getFullYear() + "/" + (month < 10 ? "0" : "") + month + "/" + (day < 10 ? "0" : "") + day;
  jQuery("#calendar").fullCalendar({
    header: {
      left: "prev,next,today",
      center: "title",
      right: "month,agendaWeek,agendaDay"
    },
    defaultView: ct_calendar_defaultView,
    buttonText: {today: today_nn, month: month_nn, agendaWeek: week_nn, agendaDay: day_nn},
    defaultDate: curdate,
    lang: set_language,
    refetch: false,
    firstDay: ct_calendar_firstDay,
    eventLimit: 6, /*  allow "more" link when too many events  */
    disableDragging: true,
    eventRender: function (event, element) {
      var event_st = event.event_status;
      if (event_st == "C") {
        element.find(".fc-title").hide();
        element.find(".fc-time").hide();
        element.find(".fc-title").before(jQuery("<i class='fa fa-check txt-success' title='"+errorobj_confirmed+"'></i>"));
        element.find(".fc-title").after(
          jQuery("<div><i class='fa fa-clock-o'></i>" + event.start.format(tymfrmt) + "</div><div>" + event.title + "</div><div><hr id='hr' /></div><div>" + event.client_name + "</div><div>" + event.client_phone + "</div><div>" + event.client_email + "</div>")
        );
      } else if (event_st == "R") {
          element.find(".fc-title").hide();
          element.find(".fc-time").hide();
          element.find(".fc-title").before(jQuery("<i class='fa fa-ban txt-danger' title='"+errorobj_rejected+"'></i>"));
          element.find(".fc-title").after(
            jQuery("<div><i class='fa fa-clock-o'></i>" + event.start.format(tymfrmt) + "</div><div>" + event.title + "</div> <div><hr id='hr' /></div><div>" + event.client_name + "</div><div>" + event.client_phone + "</div><div>" + event.client_email + "</div>")
          );
      } else if (event_st == "CC") {
          element.find(".fc-title").hide();
          element.find(".fc-time").hide();
          element.find(".fc-title").before(jQuery("<i class='fa fa-times txt-primary' title='"+errorobj_cancelled_by_client+"'></i>"));
          element.find(".fc-title").after(
            jQuery("<div><i class='fa fa-clock-o'></i>" + event.start.format(tymfrmt) + "</div><div>" + event.title + "</div> <div><hr id='hr' /></div><div>" + event.client_name + "</div><div>" + event.client_phone + "</div><div>" + event.client_email + "</div>")
          );
      } else if (event_st == "A" || event_st == "") {
          element.find(".fc-title").hide();
          element.find(".fc-time").hide();
          element.find(".fc-title").before(jQuery("<i class='fa fa-info-circle txt-warning' title='"+errorobj_pending+"'></i>"));
          element.find(".fc-title").after(
            jQuery("<div><i class='fa fa-clock-o'></i>" + event.start.format(tymfrmt) + "</div><div>" + event.title + "</div> <div><hr id='hr' /></div><div>" + event.client_name + "</div><div>" + event.client_phone + "</div><div>" + event.client_email + "</div>")
          );
      } else if (event_st == "CS") {
          element.find(".fc-title").hide();
          element.find(".fc-time").hide();
          element.find(".fc-title").before(jQuery("<i class='fa fa-times-circle-o txt-info' title='"+errorobj_calcelled_by_client+"'></i>"));
          element.find(".fc-title").after(
            jQuery("<div><i class='fa fa-clock-o'></i>" + event.start.format(tymfrmt) + "</div><div>" + event.title + "</div> <div><hr id='hr' /></div><div>" + event.client_name + "</div><div>" + event.client_phone + "</div><div>" + event.client_email + "</div>")
          );
      }else if (event_st == "CO") {
          element.find(".fc-title").hide();
          element.find(".fc-time").hide();
          element.find(".fc-title").before(jQuery("<i class='fa fa-thumbs-o-up txt-completed' title='"+errorobj_appointment_completed+"'></i>"));
          element.find(".fc-title").after(
            jQuery("<div><i class='fa fa-clock-o'></i>" + event.start.format(tymfrmt) + "</div><div>" + event.title + "</div> <div><hr id='hr' /></div><div>" + event.client_name + "</div><div>" + event.client_phone + "</div><div>" + event.client_email + "</div>")
          );
      } else if (event_st == "MN") {
          element.find(".fc-title").hide();
          element.find(".fc-time").hide();
          element.find(".fc-title").before(jQuery("<i class='fa fa-thumbs-o-down txt-danger' title='"+errorobj_appointment_marked_as_no_show+"'></i> "));
          element.find(".fc-title").after(
            jQuery("<div><i class='fa fa-clock-o'></i>" + event.start.format(tymfrmt) + "</div><div>" + event.title + "</div> <div><hr id='hr' /></div><div>" + event.client_name + "</div><div>" + event.client_phone + "</div><div>" + event.client_email + "</div>")
          );
      } else if (event_st == "RS") {
          element.find(".fc-title").hide();
          element.find(".fc-time").hide();
          element.find(".fc-title").before(jQuery("<i class='fa fa-pencil-square-o txt-info' title='"+errorobj_rescheduled+"'></i>"));
          element.find(".fc-title").after(
            jQuery("<div><i class='fa fa-clock-o'></i>" + event.start.format(tymfrmt) + "</div><div>" + event.title + "</div> <div><hr id='hr' /></div><div>" + event.client_name + "</div><div>" + event.client_phone + "</div><div>" + event.client_email + "</div>")
          );
      } else if (event_st == "GC") {
          element.find(".fc-title").hide();
          element.find(".fc-time").hide();
          element.find(".fc-title").before(jQuery("<i class='fa fa-google txt-primary' title='Google Calendar Event'></i>"));
          element.find(".fc-title").after(
            jQuery("<div><i class='fa fa-clock-o'></i>" + event.start.format(tymfrmt) + "</div><div>" + event.title + "</div>")
          );
      }
      element.css("background", event.color_tag);
      element.css("border-color", event.color_tag);
      element.attr("href", "javascript:void(0);");
      element.click(function () {
        var ajaxurl = calObj.ajax_url;
        var appointment_open_popup = event.open_popup;
        var appointment_id = event.id;
        if(!(appointment_open_popup)){
          jQuery.ajax({
            type: "post",
            data: {orderid: appointment_id, getgc_event_detail: 1},
            url: ajaxurl + "my_appoint_ajax.php",
            success: function (res) {
              jQuery(".booking-details-index-dashboard").html(res);
              jQuery("#booking-details-dashboard").modal();
              jQuery("#ct-notification-container").hide();
            }
          });
          return false;
        }
        jQuery("#reject_reason_txt").val("");
        var getdata = {appointment_id: appointment_id};
        jQuery.ajax({
          type: "post",
          url: ajaxurl + "calendar_appointment_details.php",
          data: getdata,
          dataType: "html",
          success: function (response) {
            var app_details = jQuery.parseJSON(response);
			console.log(app_details);
            jQuery("#booking-details-calendar").modal();
            jQuery(".service-html").html(app_details.service_title);
            jQuery(".method-html").html(app_details.method_title);
            jQuery(".units-html").html(app_details.unit_title);
            jQuery(".addons-html").html(app_details.addons_title);
            if (app_details.booking_status == "A") {
              jQuery(".myconfirmclass").show();
              jQuery(".confirm_btn_appt").show();
              jQuery(".reject_btn_appt").show();
              jQuery(".myrejectclass").show();
              jQuery(".mycompleteclass").hide();
              jQuery(".ct-booking-status").html("<em>"+errorobj_active+"</em>");
            } else if (app_details.booking_status == "C") {
              jQuery(".ct-booking-status").html("<i class='fa fa-check txt-success' title='"+errorobj_confirmed+"'><em>"+errorobj_confirmed+"</em></i>");
              jQuery(".myconfirmclass").hide();
              jQuery(".confirm_btn_appt").hide();
              jQuery(".reject_btn_appt").hide();
              jQuery(".myrejectclass").hide();
              jQuery(".mycompleteclass").show();
            } else if (app_details.booking_status == "R") {
              jQuery(".myrejectclass").hide();
              jQuery(".ct-booking-status").html("<i class='fa fa-ban txt-danger' title='"+errorobj_rejected+"'><em>"+errorobj_rejected+"</em></i>");
              jQuery(".reject_btn_appt").hide();
              jQuery(".confirm_btn_appt").hide();
              jQuery(".myconfirmclass").hide();
              jQuery(".mycompleteclass").hide();
            } else if (app_details.booking_status == "RS") {
              jQuery(".ct-booking-status").html("<i class='fa fa-pencil-square-o txt-info' title='"+errorobj_rescheduled+"'><em>"+errorobj_rescheduled+"</em></i>");
              jQuery(".myconfirmclass").show();
              jQuery(".confirm_btn_appt").show();
              jQuery(".reject_btn_appt").show();
              jQuery(".myrejectclass").show();
              jQuery(".mycompleteclass").hide();
            } else if (app_details.booking_status == "CC") {
              jQuery(".ct-booking-status").html("<i class='fa fa-times txt-primary' title='"+errorobj_cancel_by_client+"'><em>"+errorobj_cancel_by_client+"</em></i>");
              jQuery(".myconfirmclass").hide();
              jQuery(".confirm_btn_appt").hide();
              jQuery(".reject_btn_appt").hide();
              jQuery(".myrejectclass").hide();
              jQuery(".mycompleteclass").show();
            } else if (app_details.booking_status == "CS") {
              jQuery(".ct-booking-status").html("<i class='fa fa-times-circle-o txt-info' title='"+errorobj_cancelled_by_service_provider+"'><em>"+errorobj_cancelled_by_service_provider+"</em></i>");
              jQuery(".myconfirmclass").hide();
              jQuery(".confirm_btn_appt").hide();
              jQuery(".reject_btn_appt").hide();
              jQuery(".myrejectclass").hide();
              jQuery(".mycompleteclass").hide();
            } else if (app_details.booking_status == "CO") {
              jQuery(".ct-booking-status").html("<i class='fa fa-thumbs-o-up txt-success' title='"+errorobj_appointment_completed+"'><em>"+errorobj_appointment_completed+"</em></i>");
              jQuery(".myconfirmclass").hide();
              jQuery(".confirm_btn_appt").hide();
              jQuery(".reject_btn_appt").hide();
              jQuery(".myrejectclass").hide();
              jQuery(".mycompleteclass").hide();
            } else {
              jQuery(".ct-booking-status").html("<i class='fa fa-thumbs-o-down txt-danger' title='"+errorobj_appointment_marked_as_no_show+"'><em>"+errorobj_appointment_marked_as_no_show+"</em></i>");
              jQuery(".myconfirmclass").hide();
              jQuery(".confirm_btn_appt").hide();
              jQuery(".reject_btn_appt").hide();
              jQuery(".myrejectclass").hide();
              jQuery(".mycompleteclass").hide();
            }
            jQuery(".price").html(app_details.booking_price);
            jQuery(".duration").html(app_details.service_duration);
      
            if(app_details.client_name == ""){
              jQuery(".client_name").parent("li").hide();
            }else{
              jQuery(".client_name").parent("li").show();
              jQuery(".client_name").html(app_details.client_name);
            }
            jQuery(".client_display").attr("value", app_details.client_name);
            jQuery(".client_email").html(app_details.client_email);
            jQuery(".client_email_dis").attr("value", app_details.client_email);
            if(app_details.client_phone == ""){
              jQuery(".client_phone").parent("li").hide();
            }else{
              jQuery(".client_phone").parent("li").show();
              jQuery(".client_phone").html(app_details.client_phone);
            }
            if(app_details.client_address == ""){
              jQuery(".client_address").parent("li").hide();
            }else{
              jQuery(".client_address").parent("li").show();
			  var add_on_map = '<a href="http://maps.google.com/?q='+app_details.client_address+'" id="address_on_map1" class="address_on_map1" data-toggle="modal1" lat="" lng="" target="_blank">'+app_details.client_address+'</a>';
              jQuery(".client_address").html(add_on_map);
            }
            jQuery(".client_phone_dis").attr("value", app_details.client_phone);
            jQuery(".client_phone_dis").intlTelInput("setNumber", app_details.client_phone);
            jQuery(".starttime").html(app_details.appointment_starttime);
            jQuery(".start_time_ser option:selected").text(app_details.appointment_start_time);
            jQuery(".start_time").html(app_details.appointment_start_time);
            jQuery(".update_cal_events").attr("data-id", app_details.id);
            jQuery(".book_rejct").attr("data-bkid", app_details.id);
            jQuery(".confirm_book").attr("data-id", app_details.id);
            jQuery(".rescedual_book").attr("data-id", app_details.id);
            jQuery("#ct-reject-appointment-cal-popup").attr("data-id", app_details.id);
            jQuery(".reject_bookings").attr("data-id", app_details.id);
            jQuery(".reject_rea_appt").attr("id", "reason_reject" + app_details.id);
            jQuery(".book_cancel").attr("data-id", app_details.id);
            jQuery(".book_cancel").attr("data-bkid", app_details.id);
            jQuery(".reason_dis_cancel").attr("id", "reason_delete" + app_details.id);
            jQuery(".delete_bookings").attr("data-id", app_details.id);
            jQuery(".delete_bookings").attr("data-gc_event", app_details.gc_event_id);
            jQuery(".reject_bookings").attr("data-gc_event", app_details.gc_event_id);
            jQuery(".delete_bookings").attr("data-gc_staff_event", app_details.gc_staff_event_id);
            jQuery(".reject_bookings").attr("data-gc_staff_event", app_details.gc_staff_event_id);
            jQuery(".delete_bookings").attr("data-pid", app_details.staff_ids);
            jQuery(".reject_bookings").attr("data-pid", app_details.staff_ids);
            if(app_details.past == "Yes"){
              jQuery(".myconfirmclass").hide();
              jQuery(".confirm_btn_appt").hide();
              jQuery(".reject_btn_appt").hide();
              jQuery(".myrejectclass").hide();
              jQuery(".mycompleteclass").hide();
            }
            if(app_details.client_notes == ""){
              jQuery(".notes").parent("li").hide();
            } else {
              jQuery(".notes").parent("li").show();
              jQuery(".notes").html(app_details.client_notes);
            }
            if(app_details.global_vc_status == "Y" && app_details.vaccum_cleaner != " : -"){
              jQuery(".client_vc_status").html(app_details.vaccum_cleaner);
            } else{
              jQuery(".pop_vc_status").hide();
            }
            if(app_details.global_p_status == "Y" && app_details.parking != " : -"){
              jQuery(".client_parking").html(app_details.parking);
            } else{
              jQuery(".pop_p_status").hide();
            }
            jQuery(".client_vc_status").html(app_details.vaccum_cleaner);
            jQuery(".client_parking").html(app_details.parking);
            jQuery(".client_payment").html(app_details.payment_type);
            jQuery(".contact_status").html(app_details.contact_status);
            jQuery("#ct-complete-appointment").attr("data-id", app_details.id);
            jQuery(".ct-confirm-appointment").attr("data-id", app_details.id);
            jQuery(".ct-edit-appointment").attr("data-id", app_details.id);
            jQuery(".staff_list").html(app_details.staff);
      
            var reason_view_status = app_details.reason_view_status;
            var reject_reason = app_details.reject_reason;
            if(reason_view_status == "hide" || reject_reason == ""){
              jQuery(".li_of_reason").hide();
            }else{
              jQuery(".li_of_reason").show();
              jQuery(".reason").html(reject_reason);
            }
            if(app_details.booking_duration == ""){
              jQuery(".li_of_duration").hide();
            }else{
              jQuery(".li_of_duration").show();
              jQuery(".duration").html(app_details.booking_duration);
            }
          }
        });
      });
    },
    /*  calendar day click show manual booking  */
    dayClick: function (date, jsEvent, view) {
      var selected_datetime = new Date(date);
      var selected_date = selected_datetime.getDate();
      var selected_month = selected_datetime.getMonth() + 1;
      var selected_year = selected_datetime.getFullYear();
      var selected_date_with_format = selected_year+"-"+selected_month+"-"+selected_date;
      var current_datetime = new Date();
      var current_date = current_datetime.getDate();
      var current_month = current_datetime.getMonth() + 1;
      var current_year = current_datetime.getFullYear();
      var current_date_with_format = current_year + "-" + current_month + "-" + current_date;
      if (new Date(selected_date_with_format).getTime() < new Date(current_date_with_format).getTime()) {
        jQuery(".mainheader_message_fail").show();
        jQuery(".mainheader_message_inner_fail").css("display", "inline");
        jQuery("#ct_sucess_message_fail").text(errorobj_you_cannot_book_on_past_date);
        jQuery(".mainheader_message_fail").fadeOut(10000);
      }else if(new Date(selected_date_with_format).getTime() > new Date(advance_date).getTime()){
        jQuery(".mainheader_message_fail").show();
        jQuery(".mainheader_message_inner_fail").css("display", "inline");
        jQuery("#ct_sucess_message_fail").text(errorobj_maximum_advance_booking_time_is_over);
        jQuery(".mainheader_message_fail").fadeOut(10000);
      } else{
        jQuery(".ct-loading-main").show();
        if(selected_month.toString().length == 1){
          selected_month = "0"+selected_month;
        }
        jQuery.ajax({
          type:"POST",
          url: ajax_url+"calendar_ajax.php",
          data : {"month" : selected_month,"year" : selected_year,"get_calendar" : 1},
          success: function(res){
            jQuery(".ct-loading-main").hide();
            jQuery(".cal_info").html(res);

            /* Code For Auto select date start */
            var manual_calendar_class_name = "selected_datess"+selected_date+"-"+selected_month+"-"+selected_year;
            var selected_dates = jQuery("."+manual_calendar_class_name).attr("data-selected_dates");
            var s_date = jQuery("."+manual_calendar_class_name).attr("data-s_date");
            var c_date = jQuery("."+manual_calendar_class_name).attr("data-c_date");
            var id = jQuery("."+manual_calendar_class_name).attr("data-id");
            var cur_dates = jQuery("."+manual_calendar_class_name).attr("data-cur_dates");
            var ct_time_selected = jQuery(".ct-time-selected").text();
            var ct_date = jQuery("#save_selected_date").val();
            jQuery.ajax({
                type:"POST",
                url: ajax_url+"calendar_ajax.php",
                data : { "selected_dates" : selected_dates,"id" : id,"cur_dates" : cur_dates,"get_slots" : 1 },
                success: function(res){
                  jQuery(".ct-loading-main").hide();
                  jQuery(".time_slot_box").hide();
                  jQuery(".display_selected_date_slots_box"+id).html(res);
                  jQuery(".display_selected_date_slots_box"+id).show();

                  if(ct_time_selected != ""){
                    jQuery(".time-slot").each(function(){
                      var selectedtime = jQuery("."+manual_calendar_class_name).attr("data-ct_time_selected");
                      var slot_date = jQuery("."+manual_calendar_class_name).attr("data-slot_date");
                      
                      if(selectedtime == ct_time_selected && slot_date == ct_date){
                        jQuery("."+manual_calendar_class_name).addClass("ct-booked");
                      }
                    });
                  }
                }
            });
            var valuess = jQuery("."+manual_calendar_class_name).val();
            if(s_date >= c_date){
              jQuery(".ct-week").each(function(){
                jQuery(this).removeClass("active");
                jQuery(".ct-show-time").removeClass("shown");
              });
              jQuery("."+manual_calendar_class_name).addClass("active");
              jQuery(".ct-show-time").addClass("shown");
            }else if(s_date < c_date || valuess == ""){
              jQuery(".time_slot_box").hide();
            }
            /* Code For Auto select date end */
            jQuery("#add-new-booking").modal();
            jQuery(".ct-loading-main").hide();
          }
        });
      }
    },
    events: ajaxurl + "calendar_upcomming_appointments.php"
  });
});
/*  show edit booking modal on booking details modal  */
jQuery("#edit-booking-details").click(function () {
  jQuery("#booking-details-calendar").hide("blind", {direction: "vertical"}, .15);
  jQuery("#edit-booking-details-view").modal();
});
/*  delete staff member popover  */
jQuery(document).ajaxComplete(function () {
  jQuery("#ct-delete-staff-member").popover({
    html: true,
    content: function () {
      return jQuery("#popover-delete-member").html();
    }
  });
  var site_url=site_ur.site_url;
  jQuery("#phone-number").intlTelInput({
    autoPlaceholder: "off",
    utilsScript: site_url+"assets/js/utils.js"
  });
  /* *****   payments  page   ************ */
  var tab = jQuery("#payments-details-ajax").DataTable();
  tab.destroy();
  jQuery("#payments-details-ajax").DataTable({
    dom: "lfrtipB",
    order: [[0, "desc"]],
    buttons: [
      "excelHtml5",
      "pdfHtml5"
    ]
  });
  var tabsp = jQuery("#payments-staffp-details-ajax").DataTable();
  tabsp.destroy();
  jQuery("#payments-staffp-details-ajax").DataTable({
    dom: "lfrtipB",
    order: [[0, "desc"]],
    buttons: [
        "excelHtml5",
        "pdfHtml5"
    ]
  });
  var tabsbp = jQuery("#payments-staff-bookingandpymnt-details-ajax").DataTable();
  tabsbp.destroy();
  jQuery("#payments-staff-bookingandpymnt-details-ajax").DataTable({
    dom: "lfrtipB",
    buttons: [
      "excelHtml5",
      "pdfHtml5"
    ]
  });
  /*  registered customers form validation */
  jQuery("#registered-client-table1").validate({
    rules: {
      ct_email:{
        required: true,
        email:true,
        remote: {
          url:ajax_url+"customer_admin_ajax.php",
          type: "POST"
        }
      },
      ct_password: {
        required:true,
        minlength: 8,
      },
      ct_first_name: {
        required:true,
      },
      ct_last_name: {
        required:true,
      },    
      ct_phone: {
        minlength: 10, maxlength: 10,number:true,
      },  
      ct_address: {
        required:true,
      },
      ct_zip_code: {
        required:true,
      },
      ct_city: {
        required:true,
      },
      ct_state: {
        required:true,
      },
      
    },
    messages: {
      ct_email:{
        required:errorobj_please_enter_email,
        email:errorobj_please_enter_valid_email_address,
        remote:errorobj_email_already_exists 
      },
      ct_password: {
        required: errorobj_please_enter_password,
        minlength: errorobj_password_must_be_8_character_long,
      },
      ct_first_name: {
        required: errorobj_please_enter_first_name,
      },
      ct_last_name: {
        required: errorobj_please_enter_last_name,
      },
      ct_phone: {
        required: errorobj_please_enter_phone_number,
        minlength:errorobj_please_enter_minimum_10_digits,
        maxlength:errorobj_please_enter_valid_number,
        number : errorobj_please_enter_only_numerics        
      },
      ct_address: {
        required: errorobj_please_enter_address,
      },
      ct_zip_code: {
        required: errorobj_please_enter_zipcode,
      },
      ct_city: {
        required: errorobj_please_enter_city,
      },
      ct_state: {
        required: errorobj_please_enter_state,
      },
    }
  });
  jQuery('[data-toggle="popover"]').popover({
    placement: "left",
    html: true,
    content: function () {
      return jQuery(this).next("#popover-delete-service").html();
    }
  });
  /* reject appointment of the client */
  /* Reject Booking in Dashboard */
  jQuery(".book_rejectss").popover({
    html: true,
    content: function () {
      var booking_id = jQuery(this).attr("data-id");
      return jQuery("#popover-reject-appointment-cal-popupss" + booking_id).html();
    }
  });
  /* DELETE BOOKINGS */
  jQuery(".booking_deletess").popover({
    html: true,
    content: function () {
      var booking_id = jQuery(this).attr("data-id");
      return jQuery("#popover-delete-appointment-cal-popupss" + booking_id).html();
    }
  });
  /* Reject Booking in Dashboard */
  jQuery(".book_rejct").popover({
    html: true,
    content: function () {
      var booking_id = jQuery(this).attr("data-bkid");
      return jQuery("#popover-reject-appointment-cal-popup" + booking_id).html();
    }
  });
  /*validation  for staff insert form*/
  jQuery("#staff_update_details").validate({
    rules: {
      u_member_email:{
        required: true,
        email:true
        /* remote: {
          url:ajax_url+"staff_ajax.php",
          type: "POST"
        } */
      },
      u_member_name: {
        required:true,
      },
    },
    messages: {
      u_member_email:{
        required:errorobj_please_enter_email,
        email:errorobj_please_enter_valid_email_address
        /* remote:errorobj_email_already_exists  */
      },
      u_member_name: {
        required: errorobj_please_enter_name,
      },
    }
  });
  jQuery("[data-toggle='toggle']").bootstrapToggle("destroy");                 
  jQuery("[data-toggle='toggle']").bootstrapToggle();
});
jQuery(document).on("focusin","#company_country_code",function(){
  jQuery(this).blur();  
});
/*  Display Country Code on click flag on phone */
jQuery(document).on("click",".country",function() {
  var country_code=jQuery(this).attr("data-dial-code");
  jQuery("#company_country_code").val("+"+country_code);
  var num_code=jQuery(this).attr("data-dial-code");
  var alpha_code=jQuery(this).attr("data-country-code");
  jQuery(".numbercode").text("+"+num_code);
  jQuery(".alphacode").text(alpha_code);
  jQuery(".company_country_code_value").text("+"+num_code);
});
jQuery(document).bind("ready ajaxComplete", function () {
  jQuery("#ct-staff-member-offtime-list, #ct-staff-service-details-list, #staff-today-bookings-table, #user-profile-booking-table").DataTable();
   jQuery(".selectpicker").selectpicker({
    container: "body",
  }); 
  jQuery(".addon_ser_cam").hide();
  jQuery(".new_addons_del").hide();
  jQuery(".delete_break").popover({
    html : true,
    content: function() {
      var breakpopup_id=jQuery(this).attr("data-wiwdibi");
      return jQuery("#popover-delete-breaks"+breakpopup_id).html();
    }
  });
  
  /* hide datep[icker on select date */
  var m_jan = month.january;var m_feb = month.feb;var m_mar = month.mar;var m_apr = month.apr;var m_may = month.may;var m_jun = month.jun;var m_jul = month.jul;var m_aug = month.aug;var m_sep = month.sep;var m_oct = month.oct;var m_nov = month.nov;var m_dec = month.dec;var d_sun = days_date.sun;var d_mon = days_date.mon;var d_tue = days_date.tue;var d_wed = days_date.wed;var d_thu = days_date.thu;var d_fri = days_date.fri;var d_sat = days_date.sat;
  jQuery("#expiry_date").datepicker({
    dateFormat: "yy-mm-dd",
    minDate: 0,
    dayNamesMin: [d_sun,d_mon,d_tue,d_wed,d_thu,d_fri,d_sat],
    monthNames: [m_jan,m_feb,m_mar,m_apr,m_may,m_jun,m_jul,m_aug,m_sep,m_oct,m_nov,m_dec,]
  });
  jQuery("#expiry_date").on("change", function () {
    jQuery(".datepicker").hide();
  });
  
  jQuery(".exp_cp_date").datepicker({
    dateFormat: "yy-mm-dd",
    minDate: 0,
    dayNamesMin: [d_sun,d_mon,d_tue,d_wed,d_thu,d_fri,d_sat],
    monthNames: [m_jan,m_feb,m_mar,m_apr,m_may,m_jun,m_jul,m_aug,m_sep,m_oct,m_nov,m_dec,]
  });
  jQuery(".exp_cp_date").on("change", function () {
    jQuery(".datepicker").hide();
  });
  
  
  
  
  jQuery("#so_expiry_date").datepicker({
    dateFormat: "yy-mm-dd",
    minDate: 0,
    dayNamesMin: [d_sun,d_mon,d_tue,d_wed,d_thu,d_fri,d_sat],
    monthNames: [m_jan,m_feb,m_mar,m_apr,m_may,m_jun,m_jul,m_aug,m_sep,m_oct,m_nov,m_dec,]
  });
  jQuery("#so_expiry_date").on("change", function () {
    jQuery(".datepicker").hide();
  });
  
  jQuery(".so_exp_cp_date").datepicker({
    dateFormat: "yy-mm-dd",
    minDate: 0,
    dayNamesMin: [d_sun,d_mon,d_tue,d_wed,d_thu,d_fri,d_sat],
    monthNames: [m_jan,m_feb,m_mar,m_apr,m_may,m_jun,m_jul,m_aug,m_sep,m_oct,m_nov,m_dec,]
  });
  jQuery(".so_exp_cp_date").on("change", function () {
    jQuery(".datepicker").hide();
  });

jQuery(".edit_spe_date").datepicker({
    dateFormat: "yy-mm-dd",
    minDate: 0,
    dayNamesMin: [d_sun,d_mon,d_tue,d_wed,d_thu,d_fri,d_sat],
    monthNames: [m_jan,m_feb,m_mar,m_apr,m_may,m_jun,m_jul,m_aug,m_sep,m_oct,m_nov,m_dec,]
  });
  jQuery(".edit_spe_date").on("change", function () {
    jQuery(".datepicker").hide();
  });

  jQuery("#ct_special_days").datepicker({
    dateFormat: "yy-mm-dd",
    minDate: 0,
    dayNamesMin: [d_sun,d_mon,d_tue,d_wed,d_thu,d_fri,d_sat],
    monthNames: [m_jan,m_feb,m_mar,m_apr,m_may,m_jun,m_jul,m_aug,m_sep,m_oct,m_nov,m_dec,]
  });
  jQuery("#ct_special_days").on("change", function () {
    jQuery(".datepicker").hide();
  });
  
  jQuery(".special_cp_date").datepicker({
    dateFormat: "yy-mm-dd",
    minDate: 0,
    dayNamesMin: [d_sun,d_mon,d_tue,d_wed,d_thu,d_fri,d_sat],
    monthNames: [m_jan,m_feb,m_mar,m_apr,m_may,m_jun,m_jul,m_aug,m_sep,m_oct,m_nov,m_dec,]
  });

  jQuery(".special_cp_date").on("change", function () {
    jQuery(".datepicker").hide();
  }); 


  /*  services Addons information export details */
  jQuery("#table-service-addons").DataTable({
    retrieve: true,
    dom: "lfrtipB",
    buttons: [
      "copyHtml5",
      "excelHtml5",
      "csvHtml5",
      "pdfHtml5"
    ]
  });
  $.fn.dataTableExt.sErrMode = "throw";
  /*  services Method information export details */
  jQuery("#table-service-method").DataTable({
    retrieve: true,
    dom: "lfrtipB",
    buttons: [
      "copyHtml5",
      "excelHtml5",
      "csvHtml5",
      "pdfHtml5"
    ]
  });
  $.fn.dataTableExt.sErrMode = "throw";
  /*  services Method information export details */
  jQuery("#table-booking-addons").DataTable({
    retrieve: true,
    dom: "lfrtipB",
    buttons: [
      "copyHtml5",
      "excelHtml5",
      "csvHtml5",
      "pdfHtml5"
    ]
  });
  $.fn.dataTableExt.sErrMode = "throw";
  /*  services Method information export details */
  jQuery("#table-booking-method").DataTable({
    retrieve: true,
    dom: "lfrtipB",
    buttons: [
      "copyHtml5",
      "excelHtml5",
      "csvHtml5",
      "pdfHtml5"
    ]
  });
  $.fn.dataTableExt.sErrMode = "throw";
  /* FOR REGISTERED CUSTOMERS */
  jQuery("#registered-client-booking-details_new").DataTable({
    retrieve: true,
    dom: "lfrtipB",
    buttons: [
      "copyHtml5",
      "excelHtml5",
      "csvHtml5",
      "pdfHtml5"
    ]
  });
  $.fn.dataTableExt.sErrMode = "throw";
  /* FOR GUEST CUSTOMERS */
  jQuery("#guest-client-booking-details_new").DataTable({
    retrieve: true,
    dom: "frtipB",
    buttons: [
      "copyHtml5",
      "excelHtml5",
      "csvHtml5",
      "pdfHtml5"
    ]
  });
  $.fn.dataTableExt.sErrMode = "throw";
  /* Service Image delete */
  jQuery(".ser_del_icon").popover({
    html: true,
    content: function () {
      var deletepopup_id = jQuery(this).attr("data-pclsid");
      return jQuery("#popover-ct-remove-service-imagepcls" + deletepopup_id).html();
    }
  });
  jQuery(".new_del_ser").popover({
    html: true,
    content: function () {
      var deleteimagepopup_id = jQuery(this).attr("data-pclsid");
      return jQuery("#popover-ct-remove-service-imagepcls" + deleteimagepopup_id).html();
    }
  });
  /* Service Addons Image delete */
  jQuery(".addons_del_btn").popover({
    html: true,
    content: function () {
      var deletepopup_id = jQuery(this).attr("data-pcaolid");
      return jQuery("#popover-ct-remove-service-addons-imagepcaol" + deletepopup_id).html();
    }
  });
  jQuery(".new_addons_del").popover({
    html: true,
    content: function () {
      var deleteimagepopup_id = jQuery(this).attr("data-pcaolid");
      return jQuery("#popover-ct-remove-service-addons-imagepcaol" + deleteimagepopup_id).html();
    }
  });
  /* Setting Image delete */
  jQuery(".del_set_popup").popover({
    html: true,
    content: function () {
      return jQuery("#popover-ct-remove-company-logo-new").html();
    }
  });
  jQuery(".del_btn").popover({
    html: true,
    content: function () {
      return jQuery("#popover-ct-remove-company-logo-new").html();
    }
  });
  var site_url=site_ur.site_url;  
  var country_alpha_code = countrycodeObj.alphacode;
  var allowed_country_alpha_code = countrycodeObj.allowed;
  var array = allowed_country_alpha_code.split(",");
  if(allowed_country_alpha_code != ""){
    jQuery(".phone_number").intlTelInput({
      onlyCountries: array,
      autoPlaceholder: "off",
      utilsScript: site_url+"assets/js/utils.js"
    });
    jQuery(".selected-flag .iti-flag").addClass(country_alpha_code);
    jQuery(".selected-flag").attr("title",countrycodeObj.countrytitle);
  } else {
    jQuery(".phone_number").intlTelInput({
      autoPlaceholder: "off",
      utilsScript: site_url+"assets/js/utils.js"
    });
    jQuery(".selected-flag .iti-flag").addClass(country_alpha_code);
    jQuery(".selected-flag").attr("title",countrycodeObj.countrytitle);
  }
  /*  delete staff image popover  */
  jQuery(".delete_staff_image").popover({
    html : true,
    content: function() {
      var deletestaffimagepopup_id=jQuery(this).attr("data-pclsid");  
      return jQuery("#popover-ct-remove-staff-imagepppp"+deletestaffimagepopup_id).html();
    }
  });
});
/*  add new service 1  */
jQuery(document).on("click", "#ct-add-new-service", function () {
  jQuery(".ct-add-new-service").fadeIn();
});
/*  add new clean price calculation method 2  */
jQuery(document).on("click", "#ct-add-new-price-method", function () {
  jQuery(".ct-add-new-price-method").fadeIn();
});
/*  add new clean price calculation method 2  */
jQuery(document).on("click", "#ct-add-new-price-unit", function () {
  jQuery(".ct-add-new-price-unit").fadeIn();
});
/*  add new price row  */
jQuery(document).on("click", "#add-price-row-btn", function () {
  jQuery("#ct-add-price-row").fadeIn();
});
/*  services toggle details  */
jQuery(document).on("change", ".ct-show-hide-checkbox", function () {
  var toggle_id = jQuery(this).attr("id");
  jQuery(".detail_" + toggle_id).toggle("blind", {direction: "vertical"}, 1000);
});
jQuery(document).on("click", ".ct-edit-coupon", function () {
  jQuery(".ct-update-promocode").css("display", "block");
});
jQuery(document).on("click", ".add_promocode", function () {
  jQuery(".ct-update-promocode").css("display", "none");
});
jQuery(document).on("click", ".ct-edit-specoff", function () {
  jQuery(".ct-update-specialoff").css("display", "block");
});
jQuery(document).on("click", ".special_offer", function () {
  jQuery(".ct-update-specialoff").css("display", "none");
});
jQuery(document).on("click", ".mybtngetpaymentdate", function () {
  jQuery(".ct-loading-main").show();
  var startDate = reportrange_startDate.format('YYYY-MM-DD HH:mm');
  var endDate = reportrange_endDate.format('YYYY-MM-DD HH:mm');
  var table = jQuery("#payments-details-ajax").DataTable();
  jQuery.ajax({
    type: "post",
    data: {getallpaymentbydate: 1, startdate: startDate, enddate: endDate},
    url: ajax_url + "admin_payments_ajax.php",
    success: function (res) {
      jQuery(".mytabledisplaypayment").html(res);
      jQuery(".ct-loading-main").hide();
    }
  });
});
/*  registered customers add */
jQuery(document).on("click",".ct_register_customer_btn",function(){
  jQuery(".cw-loading-main").show();    
  var ct_email = jQuery("#ct_email").val();
  var ct_password = jQuery("#ct_password").val();
  var ct_first_name = jQuery("#ct_first_name").val();
  var ct_last_name = jQuery("#ct_last_name").val();
  var ct_phone = jQuery("#ct_phone").val();
  var ct_address = jQuery("#ct_address").val();
  var ct_zip_code = jQuery("#ct_zip_code").val();
  var ct_city = jQuery("#ct_city").val();
  var ct_state = jQuery("#ct_state").val();         
  var datastring={ct_email:ct_email,ct_password:ct_password,ct_first_name:ct_first_name,ct_last_name:ct_last_name,ct_phone:ct_phone,ct_address:ct_address,ct_zip_code:ct_zip_code,ct_city:ct_city,ct_state:ct_state,action:"add_customer_registers"};
  if(jQuery("#registered-client-table1").valid()){
    jQuery.ajax({
      type:"POST",
      url:ajax_url + "customer_admin_ajax.php",
      data:datastring,
      success:function(response){
        jQuery(".ct-loading-main").hide();
        location.reload();
      }
    });
  }
});
/*  dashboard chart  */
var doughnutData = [{
    value: 80,
    color: "#F7464A",
    highlight: "#FF5A5E",
    label: "<b>dsfkljfkdskfd<br/>asaklfsdklfsdakl</b>"
  },{
    value: 50,
    color: "#46BFBD",
    highlight: "#5AD3D1",
    label: "Green"
  },{
    value: 100,
    color: "#FDB45C",
    highlight: "#FFC870",
    label: "Yellow"
  },{
    value: 40,
    color: "#949FB1",
    highlight: "#A8B3C5",
    label: "Grey"
  },{
    value: 120,
    color: "#4D5360",
    highlight: "#616774",
    label: "Dark Grey"
  }
];
/*  Dashboard today and latest activity popup  */
jQuery(document).on("click", ".ct-today-list", function () {
  jQuery(".modal").css("background", "rgba(0,0,0,0.1)");
});
jQuery(document).on("click", ".ct-activity-list", function () {
  jQuery(".modal").css("background", "rgba(0,0,0,0.1)");
});
/*  image upload in services  */
/* convert bytes into friendly format */
function bytesToSize(bytes) {
  var sizes = ["Bytes", "KB", "MB"];
  if (bytes == 0) return "n/a";
  var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
  return (bytes / Math.pow(1024, i)).toFixed(1) + " " + sizes[i];
};
/* check for selected crop region */
function checkForm() {
  if (parseInt(jQuery("#w").val())) return true;
  jQuery(".error").html(errorobj_please_select_a_crop_region_and_then_press_upload).show();
  return false;
};
/* clear info by cropping (onRelease event handler) */
function clearInfo() {
  jQuery(".info #w").val("");
  jQuery(".info #h").val("");
};
function storeCoords(c) {
  jQuery("#X").val(c.x);
  jQuery("#Y").val(c.y);
  jQuery("#W").val(c.w);
  jQuery("#H").val(c.h);
};
/* Create variables (in this scope) to hold the Jcrop API and image size */ 
var jcrop_api, boundx, boundy;
jQuery(document).on("change", ".ct-upload-images", function (e) {
  var uploadsection = jQuery(this).attr("id");
  var ctus = jQuery(this).attr("data-us");
  var oFile = jQuery("#" + uploadsection)[0].files[0];
  jQuery("#" + ctus + "ctimagename").val(oFile.name);
  /* check for image type (jpg and png are allowed) */
  var rFilter = /^(image\/jpeg|image\/png|image\/gif)$/i;
  if (!rFilter.test(oFile.type)) {
    jQuery(".error_image").addClass("error");
    jQuery(".error_image").html(errorobj_please_select_a_valid_image_file_jpg_and_png_are_allowed).show();
    jQuery("#" + ctus + "ctimagename").val("");
    //jQuery(".com_set").addClass("disabled");
    return;
    }else{
    //jQuery(".com_set").removeClass("disabled");
	jQuery(".error_image ").text("");
  }
  /*  check for file size  */
  var file = this.files[0];
  var fileType = file["type"];
  var ValidImageTypes = ["image/jpeg", "image/png", "image/gif"];
  if (jQuery.inArray(fileType, ValidImageTypes) < 0) {
    jQuery(".error_image").addClass("error");
    jQuery(".error_image").html(errorobj_only_jpeg_png_and_gif_images_allowed);
    return;
  }
  var file_size = jQuery(this)[0].files[0].size;
  var maxfilesize = 1048576 * 2;
  /*  Here 2 repersent MB  */
  if (file_size >= maxfilesize) {
    jQuery(".error_image").addClass("error");
    jQuery(".error_image").html(errorobj_maximum_file_upload_size_2_mb);
    return;
  }
  var file_size = jQuery(this)[0].files[0].size;
  var minfilesize = 1048576 * 0.0005; 
  /*  Here 5 repersent KB  */
  if (file_size <= minfilesize) {
    jQuery(".error_image").addClass("error");
    jQuery(".error_image").html(errorobj_minimum_file_upload_size_1_kb);
    return;
  }
  /* preview element */
  var oImage = document.getElementById("ct-preview-img" + ctus);
  /* prepare HTML5 FileReader */
  var oReader = new FileReader();
  oReader.onload = function (e) {
    /* e.target.result contains the DataURL which we can use as a source of the image */
    oImage.src = e.target.result;
    oImage.onload = function () { /* onload event handler */
      /* show image popup for image crop */
      jQuery("#ct-image-upload-popup" + ctus).modal();

      /*  display some basic image info */
      var sResultFileSize = bytesToSize(oFile.size);
      jQuery("#" + ctus + "filesize").val(sResultFileSize);
      jQuery("#" + ctus + "ctimagetype").val(oFile.type);

      /* destroy Jcrop if it is existed */
      if (typeof jcrop_api != "undefined") {
        jcrop_api.destroy();
        jcrop_api = null;
        jQuery("#ct-preview-img" + ctus).width(oImage.naturalWidth);
        jQuery("#ct-preview-img" + ctus).height(oImage.naturalHeight);
      }
      jQuery("#ct-preview-img" + ctus).width(oImage.naturalWidth);
      jQuery("#ct-preview-img" + ctus).height(oImage.naturalHeight);
      setTimeout(function () {
        jQuery("#ct-preview-img" + ctus).Jcrop({
          minSize: [32, 32], /* min crop size */
          /* onSelect: [0, 0, 150, 180], */
          setSelect: [1000,1000, 180, 200],
          /* aspectRatio: 1, */ /* keep aspect ratio 1:1 */
          bgFade: true, /* use fade effect */
          bgOpacity: .3, /* fade opacity   */
          /* maxSize: [200, 200],           */

          boxWidth: 575,   /* Maximum width you want for your bigger images */
          boxHeight: 400,
          /* trueSize : [1000,1500], */
          /* onSelect: showCoords,   */
          /* onChange: showCoords,   */

          onChange: function (e) {
            jQuery("#" + ctus + "x1").val(e.x);
            jQuery("#" + ctus + "y1").val(e.y);
            jQuery("#" + ctus + "x2").val(e.x2);
            jQuery("#" + ctus + "y2").val(e.y2);
            jQuery("#" + ctus + "w").val(e.w);
            jQuery("#" + ctus + "h").val(e.h);
          },
        onSelect: function (e) {
            jQuery("#" + ctus + "x1").val(e.x);
            jQuery("#" + ctus + "y1").val(e.y);
            jQuery("#" + ctus + "x2").val(e.x2);
            jQuery("#" + ctus + "y2").val(e.y2);
            jQuery("#" + ctus + "w").val(e.w);
            jQuery("#" + ctus + "h").val(e.h);
          },
          onRelease: clearInfo
        }, function () {
          /* jcrop_api.destroy(); */
          /* use the Jcrop API to get the real image size */
          var bounds = this.getBounds();
          boundx = bounds[0];
          boundy = bounds[1];

          /* Store the Jcrop API in the jcrop_api variable */
          jcrop_api = this;
        });
      }, 500);

    };
  };
  oReader.readAsDataURL(oFile);
});
/* DELETE SERVICE  */
jQuery(document).on("click", ".service-delete-button", function () {
  jQuery(".ct-loading-main").show();
  var deleteid=jQuery(this).attr("data-serviceid");
  var imagename=jQuery(this).attr("data-imagename");
  jQuery.ajax({
    type: "post",
    data: { "deleteid":deleteid, "imagename":imagename },
    url: ajax_url + "service_ajax.php",
    success: function (res) {
      jQuery(".mainheader_message").show();
      jQuery(".mainheader_message_inner").css("display", "inline");
      jQuery("#ct_sucess_message").text(errorobj_record_deleted_successfully);
      jQuery(".mainheader_message").fadeOut(3000);
      jQuery(".ct-loading-main").hide();
      jQuery("#ct-close-popover-delete-service").trigger("click");
      jQuery("#servicelist"+deleteid).fadeOut("slow");
    }
  });
});
/* UPADTE STATUS OF  SERVICE  */
jQuery(document).on("change", ".myservice_status", function () {
  if (jQuery(this).prop("checked") == true) {
    jQuery(".ct-loading-main").show();
    var id = jQuery(this).attr("data-id");
    jQuery.ajax({
      type: "post",
      data: { id: id, changestatus: "E" },
      url: ajax_url + "service_ajax.php",
      success: function (res) {
        jQuery(".mainheader_message").show();
        jQuery(".mainheader_message_inner").css("display", "inline");
        jQuery("#ct_sucess_message").text(res);
        jQuery(".mainheader_message").fadeOut(3000);
        jQuery(".ct-loading-main").hide();
      }
    });
  } else {
    jQuery(".ct-loading-main").show();
    var id = jQuery(this).attr("data-id");
    jQuery.ajax({
      type: "post",
      data: { id: id, changestatus: "D" },
      url: ajax_url + "service_ajax.php",
      success: function (res) {
        jQuery(".mainheader_message").show();
        jQuery(".mainheader_message_inner").css("display", "inline");
        jQuery("#ct_sucess_message").text(res);
        jQuery(".mainheader_message").fadeOut(3000);
        jQuery(".ct-loading-main").hide();
      }
    });
  }
});
/* UPLOAD SERVCIE IMAGE */
var serviceimagename = "";
jQuery(document).on("click", ".ct_upload_img1", function (e) {
  jQuery(".ct-loading-main").show();
  var img_site_url = servObj.site_url;
  var imgObj_url = imgObj.img_url;
  var imageuss = jQuery(this).attr("data-us");
  var imageids = jQuery(this).attr("data-imageinputid");
  var file_data = jQuery("#" + jQuery(this).attr("data-imageinputid")).prop("files")[0];
  var formdata = new FormData();
  var ctus = jQuery(this).attr("data-us");
  var img_w = jQuery("#" + ctus + "w").val();
  var img_h = jQuery("#" + ctus + "h").val();
  var img_x1 = jQuery("#" + ctus + "x1").val();
  var img_x2 = jQuery("#" + ctus + "x2").val();
  var img_y1 = jQuery("#" + ctus + "y1").val();
  var img_y2 = jQuery("#" + ctus + "y2").val();
  var img_name = jQuery("#" + ctus + "newname").val();

	
  var img_id = jQuery("#" + ctus + "id").val();
  formdata.append("image", file_data);
  formdata.append("w", img_w);
  formdata.append("h", img_h);
  formdata.append("x1", img_x1);
  formdata.append("x2", img_x2);
  formdata.append("y1", img_y1);
  formdata.append("y2", img_y2);
  formdata.append("newname", img_name);
  formdata.append("img_id", img_id);
  jQuery.ajax({
    url: ajax_url + "upload.php",
    type: "POST",
    data: formdata,
    cache: false,
    contentType: false,
    processData: false,
    success: function (data) {
      jQuery(".ct-loading-main").hide();
      if (data == "") {
        jQuery(".error-service").addClass("show");
        jQuery(".hidemodal").trigger("click");
      } else {
        jQuery("#" + ctus + "ctimagename").val(data);
        jQuery(".hidemodal").trigger("click");
        jQuery("#" + ctus + "serviceimage").attr("src", imgObj_url + "services/" + data);
        jQuery(".error_image").hide();
        jQuery("#" + ctus + "serviceimage").attr("data-imagename", data);
        serviceimagename = jQuery("#" + ctus + "serviceimage").attr("data-imagename");
      }
      jQuery("#"+imageids).val("");
    }
  });
});
/*  INSERT SERVICE */
jQuery(document).on("click", ".myserviceaddbtn", function () {
  var color = jQuery(".mycolortag").val();
  var title = jQuery(".myservicetitle").val();
  var desc = jQuery(".myservicedesc").val();
  var image =  jQuery("#pcasctimagename").val();
  var err_msg =  jQuery(".error_image ").text();
  if(err_msg != ""){
	  return false;
  }
  /*  service edit form validation  */
  jQuery("#addservice_form").validate();
  jQuery("#ct-service-title").rules("add",{
    required: true,
    messages: {required: errorobj_please_enter_service_title}
  });
  jQuery("#ct-service-color-tag").rules("add",{
    required: true,
    messages: {required: errorobj_please_enter_color_code}
  });
  if (!jQuery("#addservice_form").valid()) {
    return false;
  }
  jQuery(".ct-loading-main").show();
  jQuery.ajax({
    type: "post",
    data: { "color": color, "title": title, "description": desc, "image": image, "operationadd": 1, "status": "D", "position": 0 },
    url: ajax_url + "service_ajax.php",
    success: function (res) {
      if(parseInt(res) == 1){
        jQuery(".mainheader_message_fail").show();
        jQuery(".mainheader_message_inner_fail").css("display", "inline");
        jQuery("#ct_sucess_message_fail").text(errorobj_sorry_service_already_exist);
        jQuery(".mainheader_message_fail").fadeOut(3000);
        jQuery(".ct-loading-main").hide();
      } else{
        jQuery(".mainheader_message").show();
        jQuery(".mainheader_message_inner").css("display", "inline");
        jQuery("#ct_sucess_message").text(errorobj_record_inserted_successfully);
        jQuery(".mainheader_message").fadeOut(3000);
        jQuery(".ct-loading-main").hide();
        location.reload();
      }
    }
  });
});
/* EDIT SERVICE */
jQuery(document).on("click", ".edtservicebtn", function () {
  var i = jQuery(this).attr("data-id");
  var color = jQuery(".edtservicecolor" + i).val();
  var title = jQuery(".edtservicetitle" + i).val();
  var desc = jQuery(".edtservicedesc" + i).val();
  var image = jQuery("#pcls" + i + "ctimagename").val();
  var err_msg =  jQuery(".error_image ").text();
  if(err_msg != ""){
	  return false;
  }
  /* service edit form validation */
  jQuery("#editform_service" + i).validate();
  jQuery.validator.addMethod("pattern_title", function(value, element) {
    return this.optional(element) || /^[a-zA-Z '.'_@./#&+-]+$/.test(value);
  }, "Enter Only Alphabets");
  jQuery("#ct-service-title" + i).rules("add",{
    required: true,
    messages: {required: errorobj_please_enter_service_title}
  });
  jQuery("#ct-service-color-tag" + i).rules("add", {
    required: true,
    messages: {required: errorobj_please_enter_color_code}
  });
  if (!jQuery("#editform_service" + i).valid()) {
    return false;
  }
  jQuery(".ct-loading-main").show();
  jQuery.ajax({
    type: "post",
    data: { "id": i, "color": color, "title": title, "description": desc, "image": image, "operationedit": 1, "status": "D", "position": 0 },
    url: ajax_url + "service_ajax.php",
    success: function (res) {
      jQuery(".mainheader_message").show();
      jQuery(".mainheader_message_inner").css("display", "inline");
      jQuery("#ct_sucess_message").text(errorobj_record_updated_successfully);
      jQuery(".mainheader_message").fadeOut(3000);
      jQuery(".ct-loading-main").hide();
      jQuery("#detail_myid"+i).fadeOut();
      jQuery("#myid"+i).prop("checked",false);
      jQuery("#color_back"+i).css("background-color",color);
      var str_title = title;
      str_title = str_title.toLowerCase().replace(/\b[a-z]/g, function(letter) {
        return letter.toUpperCase();
      });
      jQuery("#title_ser"+i).html(str_title);
      jQuery("#ct-service-title"+i).val(str_title);
      
      jQuery(".ser_del_icon").hide();
      if (image == "" || image == null) {} else {
        jQuery(".ct-clean-service-img-icon-label").hide();
        jQuery(".ct-clean-service-img-icon-label").removeClass("show");
        jQuery(".old_cam_ser"+i).hide();
        jQuery(".del_btn_popup"+i).show();
        jQuery(".del_btn_popup"+i).addClass("show");
        jQuery(".new_del_ser").hide();
        jQuery(".new_cam_ser").hide();
      }
      location.reload();
    }
  });
});
/* CHANGE FRONT END VIEW DESIGN OF SERVICES */
jQuery(document).on("click", ".design_radio_btn", function () {
  mydesignid = jQuery(this).val();
  mydivname = "service";
  jQuery.ajax({
    type: "post",
    data: { "designid": mydesignid, "divname": mydivname, "assigndesign": 1 },
    url: ajax_url + "service_ajax.php",
    success: function (res) {}
  });
});
/* ASSIGN METHOD TO SERVICE PAGE SERVICE METHODS PAGE */
/* 
mydesign stands for design id which we assign example design -1,2,3,4
mydivname stands for for which section we want to assign the design
*/
var mydesignid = "";
var mydivname = "";
jQuery(".mybtnsavefordesign").css("display", "none");
/* CHANGE DESIGN SELECTION FOR DISPLAYING IT IN FRONT END */
jQuery(document).on("click", ".design_radio_btn_units", function () {
  jQuery(".ct-loading-main").show();
  mydesignid = jQuery(this).val();
  mymethodunitsid = jQuery(this).attr("data-methodid");
  jQuery.ajax({
    type: "post",
    data: { "designid": mydesignid, "service_method_id": mymethodunitsid, "assigndesign": 1 },
    url: ajax_url + "service_method_units_ajax.php",
    success: function (res) {
      jQuery(".ct-loading-main").hide();
    }
  });
});
/* SET TITLE FOR THE PAGE OF SERVICES METHODS IN BREADCRUMB */
jQuery(document).on("click", ".mybtnforassignmethods", function () {
  var id = jQuery(this).attr("data-id");
  var title = jQuery(this).attr("data-name");
  localStorage["serviceid"] = id;
  localStorage["title"] = title;
  window.location = "service-manage-calculation-methods.php";
});
/* DELETE SERVICE METHOD */
jQuery(document).on("click", ".service-methods-delete-button", function () {
  jQuery(".ct-loading-main").show();
  var deletemethoid=jQuery(this).attr("data-servicemethodid");
  var datastring={deletemethoid:deletemethoid,action:"deletemethod"};
  jQuery.ajax({
    type:"POST",
    url:ajax_url + "service_method_ajax.php",
    data:datastring,
    success:function(response){
      jQuery(".ct-loading-main").hide();
      jQuery(".mainheader_message").show();
      jQuery(".mainheader_message_inner").css("display", "inline");
      jQuery("#ct_sucess_message").text(errorobj_method_deleted_successfully);
      jQuery(".mainheader_message").fadeOut(3000);
      jQuery("#ct-close-popover-delete-service").trigger("click");
      jQuery("#service_method_"+deletemethoid).fadeOut(1000);
    }
  });
});
/* UPDATE SERVICE METHODS STATUS */
jQuery(document).on("change", ".myservices_methods_status", function () {
  jQuery(".ct-loading-main").show();
  var id = jQuery(this).attr("data-id");
  var statuss = jQuery(this).prop("checked");
  if (statuss == false) {
    jQuery(this).prop("checked","");
    var st = "D";
  } else {
    jQuery(this).prop("checked");
    var st = "E";
  }
  jQuery.ajax({
    type: "post",
    data: { id: id, changestatus: st },
    url: ajax_url + "service_method_ajax.php",
    success: function (res) {
      jQuery(".ct-loading-main").hide();
      jQuery(".mainheader_message").show();
      jQuery(".mainheader_message_inner").css("display", "inline");
      jQuery("#ct_sucess_message").text(res);
      jQuery(".mainheader_message").fadeOut(3000);
    }
  });
  event.preventDefault(); 
});
/* INSERT SERVICE METHODS */
jQuery(document).on("click", ".btnservices_method", function () {
  /* needed service_id,methodname,status */
  var service_id = localStorage["serviceid"];
  var name = jQuery(".mytxtservice_methodname").val();
  /* service edit form validation */
  jQuery("#service_method_addform").validate();
  jQuery("#txtmethodname").rules("add",{
    required: true,
    messages: {required: errorobj_please_enter_method_title}
  });
  if (!jQuery("#service_method_addform").valid()) {
    return false;
  }
  jQuery(".ct-loading-main").show();
  jQuery.ajax({
    type: "post",
    data: { "service_id": service_id, "name": name, "status": "D", "operationinsert": 1 },
    url: ajax_url + "service_method_ajax.php",
    success: function (res) {
      if(parseInt(res) == 1){
        jQuery(".ct-loading-main").hide();
        jQuery(".mainheader_message_fail").show();
        jQuery(".mainheader_message_inner_fail").css("display", "inline");
        jQuery("#ct_sucess_message_fail").text(errorobj_sorry_method_already_exist);
        jQuery(".mainheader_message_fail").fadeOut(3000);
      } else {
        jQuery(".mainheader_message").show();
        jQuery(".mainheader_message_inner").css("display", "inline");
        jQuery("#ct_sucess_message").text(errorobj_method_inserted_successfully);
        jQuery(".mainheader_message").fadeOut(3000);
        jQuery(".ct-loading-main").hide();
        location.reload();
      }
    }
  });
});
/* UPDATE SERVICE METHODS DATA */
jQuery(document).on("click", ".btnservices_method_update", function () {
  var i = jQuery(this).attr("data-id");
  var title = jQuery(".mytxtservice_methodname" + i).val();
  /* service edit form validation */
  jQuery("#service_method_editform" + i).validate();
  jQuery("#txtedtmethodname" + i).rules("add",{
    required: true,
    messages: {required: errorobj_please_enter_method_title}
  });
  if (!jQuery("#service_method_editform" + i).valid()) {
    return false;
  }
  jQuery(".ct-loading-main").show();
  jQuery.ajax({
    type: "post",
    data: { "id": i, "method_title": title, "operationedit": 1 },
    url: ajax_url + "service_method_ajax.php",
    success: function (res) {
      jQuery(".mainheader_message").show();
      jQuery(".mainheader_message_inner").css("display", "inline");
      jQuery("#ct_sucess_message").text(errorobj_record_updated_successfully);
      jQuery(".mainheader_message").fadeOut(3000);
      jQuery(".ct-loading-main").hide();
      jQuery("#detailmes_sp"+i).fadeOut();
      jQuery("#sp"+i).prop("checked",false);
      var str_title = title;
      str_title = str_title.toLowerCase().replace(/\b[a-z]/g, function(letter) {
        return letter.toUpperCase();
      });
      jQuery("#service_name"+i).html(str_title);
      jQuery("#txtedtmethodname"+i).val(str_title);
    }
  });
});
/* service-manage-unit-price-btn */
/* set id and title of method to service-manage-unit-price-code */
jQuery(document).on("click", ".mybtnforassignunits", function () {
  var id = jQuery(this).attr("data-id");
  var title = jQuery(this).attr("data-name");
  localStorage["methodid"] = id;
  localStorage["method_title"] = title;
  window.location = "service-manage-unit-price.php";
});
/* SERVICE METHODS UNITS INSERT NEW */
jQuery(document).on("click", ".mybtnservice_method_unitsave", function () {
  /* service edit form validation */
  jQuery("#service_method_unitaddform").validate();
  jQuery("#txtunitnamess").rules("add",{
    required: true,
    messages: {required: errorobj_please_enter_unit_title}
  });
  jQuery("#txtbasepricess").rules("add",{
    required: true, pattern_price: true,
    messages: {required: errorobj_please_assign_base_price_for_unit}
  });
  if (!jQuery("#service_method_unitaddform").valid()) {
    return false;
  }
  jQuery(".ct-loading-main").show();
  jQuery.ajax({
    type: "post",
    data: { "service_id": localStorage["serviceid"], "method_id": localStorage["methodid"], "unit_name": jQuery(".mytxt_service_method_unitname").val(), "base_price": jQuery(".mytxt_service_method_unitbaseprice").val(), "operationinsert": 1 },
    url: ajax_url + "service_method_units_ajax.php",
    success: function (res) {
      if(parseInt(res) == 1){
        jQuery(".ct-loading-main").hide();
        jQuery(".mainheader_message_fail").show();
        jQuery(".mainheader_message_inner_fail").css("display", "inline");
        jQuery("#ct_sucess_message_fail").text(errorobj_sorry_unit_already_exist);
        jQuery(".mainheader_message_fail").fadeOut(3000);
      }
      else{
        jQuery(".mainheader_message").show();
        jQuery(".mainheader_message_inner").css("display", "inline");
        jQuery("#ct_sucess_message").text(errorobj_unit_inserted_successfully);
        jQuery(".mainheader_message").fadeOut(3000);
        jQuery(".ct-loading-main").hide();
        window.location.reload();
      }
    }
  });
});
/* SERVICE METHODS UNITS DELETE */
jQuery(document).on("click", ".service-methods-units-delete-button", function () {
  /* Delete data is my own function */
  jQuery(".ct-loading-main").show();
  var id = jQuery(this).attr("data-service_method_unitid");
  jQuery.ajax({
    type: "post",
    data: { "deleteid": id },
    url: ajax_url + "service_method_units_ajax.php",
    success: function (res) {
      jQuery(".ct-loading-main").hide();
      jQuery(".mainheader_message").show();
      jQuery(".mainheader_message_inner").css("display", "inline");
      jQuery("#ct_sucess_message").text(errorobj_record_deleted_successfully);
      jQuery(".mainheader_message").fadeOut(3000);
      location.reload();
    }
  });
});
/* SERVICE METHODS UNITS UPDATE STATUS */
jQuery(document).on("change", ".myservices_methods_units_status", function (event) {
  if (jQuery(this).prop("checked") == true) {
    jQuery(".ct-loading-main").show();
    var id = jQuery(this).attr("data-id");
    jQuery.ajax({
      type: "post",
      data: { id: id, changestatus: "E" },
      url: ajax_url + "service_method_units_ajax.php",
      success: function (res) {
        jQuery(".ct-loading-main").hide();
        jQuery(".mainheader_message_inner").css("display","inline");
        jQuery("#ct_sucess_message").html(errorobj_units_status_updated);
        jQuery(".mainheader_message").show();
        jQuery(".mainheader_message").fadeOut(5000);
      }
    });
    event.preventDefault(); 
  } else {
    jQuery(".ct-loading-main").show();
    var id = jQuery(this).attr("data-id");
    jQuery.ajax({
        type: "post",
        data: { id: id, changestatus: "D" },
        url: ajax_url + "service_method_units_ajax.php",
        success: function (res) {
          jQuery(".ct-loading-main").hide();
          jQuery(".mainheader_message_inner").css("display","inline");
          jQuery("#ct_sucess_message").html(errorobj_units_status_updated);
          jQuery(".mainheader_message").show();
          jQuery(".mainheader_message").fadeOut(5000);
          location.reload();
        }
    });
    event.preventDefault(); 
  }
});
/* SERVICE METHODS UNITS UPDATE */
jQuery(document).on("click", ".mybtnservice_method_unitupdate", function () {
  var i = jQuery(this).attr("data-id");
  var units_title = jQuery(".mytxtservice_method_uniteditname" + i).val();
  var units_hours = jQuery(".mytxtservice_method_unitedithours" + i).val();
  var units_mints = jQuery(".mytxtservice_method_uniteditmints" + i).val();
  var base_price = jQuery(".mytxtservice_method_uniteditbase_price" + i).val();
  var minlimit = jQuery(".mytxt_service_method_editminlimit" + i).val();
  var maxlimit = jQuery(".mytxt_service_method_editmaxlimit" + i).val();
  var maxlimit_title = jQuery(".mytxt_service_method_editmaxlimit_title" + i).val();
  var unit_symbol = jQuery(".mytxt_service_method_symbol" + i).val();
  jQuery("#service_method_unit_price" + i).validate();
  jQuery("#txtedtunitname" + i).rules("add",{
    required: true,
    messages: {required: errorobj_please_enter_unit_title}
  });
  jQuery("#txtedtunithours" + i).rules("add",{
    pattern_onlynumber: true, range:function(element){if (parseInt(jQuery("#txtedtunitmints"+i).val()) > 0){return [0,23];}else {return [0,24];}},
    messages: {pattern_onlynumber: errorobj_enter_only_digits, range:errorobj_please_enter_hours}
  });
  jQuery("#txtedtunitmints" + i).rules("add",{
    required: function(element) {if (parseInt(jQuery("#txtedtunithours"+i).val()) > 0){return false;}else { return true;}}, pattern_onlynumber: true,range:function(element){if (parseInt(jQuery("#txtedtunithours"+i).val()) > 0){return [0,59];}else {return [5,59];}},
    messages: {required: errorobj_please_enter_minutes, pattern_onlynumber: errorobj_enter_only_digits, range:errorobj_please_enter_minimum_5_minutes_maximum_59_minutes}
  });
  jQuery("#txtedtunitbaseprice" + i).rules("add",{
    required: true, pattern_price: true,
    messages: {required: errorobj_please_assign_base_price_for_unit}
  });
  jQuery("#txtedtunitminlimit" + i).rules("add", {
    required: true, pattern_onlynumber: true,min:1,
    messages: {required: errorobj_please_enter_minlimit, pattern_onlynumber: errorobj_enter_only_digits}
  });   
  jQuery("#txtedtunitmaxlimit" + i).rules("add",{
    required: true, pattern_onlynumber: true, min:jQuery("#txtedtunitminlimit" + i).val(),
    messages: {required: errorobj_please_enter_maxlimit, pattern_onlynumber: errorobj_enter_only_digits,min:errorobj_please_enter_minvalue_for_maxlimit}
  });
  if (!jQuery("#service_method_unit_price" + i).valid()) {
    return false;
  }
  jQuery(".ct-loading-main").show();
  jQuery.ajax({
    type: "post",
    data: { "id": i, "units_title": units_title, "units_hours": units_hours, "units_mints": units_mints, "base_price": base_price, "minlimit": minlimit, "maxlimit": maxlimit, "maxlimit_title": maxlimit_title, "unit_symbol": unit_symbol, "operationedit": 1 },
    url: ajax_url + "service_method_units_ajax.php",
    success: function (res) {
      jQuery(".mainheader_message").show();
      jQuery(".mainheader_message_inner").css("display", "inline");
      jQuery("#ct_sucess_message").text(errorobj_record_updated_successfully);
      jQuery(".ct-loading-main").hide();
      jQuery(".mainheader_message").fadeOut(3000);
      var str = jQuery(".mytxtservice_method_uniteditname" + i).val();
      str = str.toLowerCase().replace(/\b[a-z]/g, function(letter) {
        return letter.toUpperCase();
      });
      jQuery("#method_unit_name"+i).html(str);
      jQuery("#detailmes_sp"+i).fadeOut();
      jQuery("#sp"+i).prop("checked",false);
      location.reload();
    }
  });
});
/* SERVICE METHODS UNITS RATE DELETE ROW */
jQuery(document).on("click", ".mynewrow_btndelete", function () {
  jQuery(this).closest("li").remove();
});
/* SERVICE METHODS UNITS RATE LOAD ALL QTY RATE  */
jQuery(document).on("click", ".quantity-rules-btn", function () {
  var quantityno = jQuery(this).attr("data-id");
  jQuery(".ct-loading-main").show();
  jQuery.ajax({
    type: "post",
    data: { "unit_id": quantityno, "operation_getallqtyprice": 1 },
    url: ajax_url + "service_method_units_ajax.php",
    success: function (res) {
      jQuery(".myunitspricebyqty" + quantityno).html(res);
    }
  });
  jQuery(".manage-unit-price-container" + quantityno).fadeIn();
  jQuery(".ct-loading-main").hide();
});
jQuery(document).on("click", ".myaddnewatyrule_units", function () {
  var id = jQuery(this).attr("data-id");
  var qty = jQuery(".mynewqty" + id).val();
  var rules = jQuery(".mynewrule" + id).val();
  var price = jQuery(".mynewprice" + id).val();
  /* service edit form validation */
  jQuery("#mynewaddedform_units" + id).validate();
  jQuery("#mynewaddedqty_units" + id).rules("add",{
    required: true, pattern_price: true,
    messages: {required: errorobj_please_enter_some_qty, pattern_price: "Please enter valid unit"}
  });
  jQuery("#mynewaddedprice_units" + id).rules("add",{
    required: true, pattern_price: true,
    messages: {required: errorobj_please_assign_price, pattern_price: errorobj_please_enter_valid_price}
  });
  if (!jQuery("#mynewaddedform_units" + id).valid()) {
    return false;
  }
  jQuery(".ct-loading-main").show();
  jQuery.ajax({
    type: "post",
    data: { "unit_id": id, "qty": qty, "rules": rules, "price": price, "operation_insertqtyprice_unit": 1 },
    url: ajax_url + "service_method_units_ajax.php",
    success: function (res) {
      jQuery.ajax({
        type: "post",
        data: { "unit_id": id, "operation_getallqtyprice": 1 },
        url: ajax_url + "service_method_units_ajax.php",
        success: function (ress) {
          jQuery(".myunitspricebyqty" + id).html(ress);
        }
      });
      jQuery(".manage-unit-price-container" + id).fadeIn();
      jQuery(".ct-loading-main").hide();
    }
  });
});
/* delete the qty price from the selected method */
jQuery(document).on("click", ".myloadedbtndelete_units", function () {
  var delid = jQuery(this).attr("data-id");
  jQuery(".ct-loading-main").show();
  jQuery.ajax({
    type: "post",
    data: { "id": delid, "operationdelete_unitprice": 1 },
    url: ajax_url + "service_method_units_ajax.php",
    success: function (res) {
      jQuery(".myunitqty_price_row" + delid).remove();
      jQuery(".ct-loading-main").hide();
    }
  });
});
/* edit the unit price by click of thumbs up symbol */
jQuery(document).on("click", ".myloadedbtnsave_units", function () {
  var editid = jQuery(this).attr("data-id");
  var qty = jQuery(".myloadedqty_units" + editid).val();
  var rules = jQuery(".myloadedrules_units" + editid).val();
  var price = jQuery(".myloadedprice_units" + editid).val();
  jQuery("#myeditform_units" + editid).validate();
  jQuery("#myeditqty_units" + editid).rules("add",{
    required: true, pattern_price: true,
    messages: {required: errorobj_please_enter_some_qty, pattern_price: "Please enter valid unit"}
  });
  jQuery("#myeditprice_units" + editid).rules("add",{
    required: true, pattern_price: true,
    messages: {required: errorobj_please_assign_price, pattern_price: errorobj_please_enter_valid_price}
  });
  if (!jQuery("#myeditform_units" + editid).valid()) {
    return false;
  }
  jQuery(".ct-loading-main").show();
  jQuery.ajax({
    type: "post",
    data: { "editid": editid, "qty": qty, "rules": rules, "price": price, "operation_updateqtyprice_unit": 1 },
    url: ajax_url + "service_method_units_ajax.php",
    success: function (res) {
      jQuery(".mainheader_message").show();
      jQuery(".mainheader_message_inner").css("display", "inline");
      jQuery("#ct_sucess_message").text(errorobj_record_updated_successfully);
      jQuery(".mainheader_message").fadeOut(3000);
      jQuery(".ct-loading-main").hide();
    }
  });
});
/* change design of service on radio select assign design to services */
jQuery(document).on("click", ".design_radio_btn_addons", function () {
  mydesignid = jQuery(this).val();
  mydivname = "ct_addons_default_design";
  jQuery.ajax({
    type: "post",
    data: { "designid": mydesignid, "divname": mydivname, "assigndesign": 1 },
    url: ajax_url + "setting_ajax.php",
    success: function (res) {
      jQuery(".mainheader_message_addon_design").show();
      jQuery(".mainheader_message_inneraddon_design").css("display", "inline");
      jQuery("#ct_sucess_message_addon_design").text(errorobj_design_set_successfully);
      jQuery(".mainheader_message_addon_design").fadeOut(3000);
    }
  });
});
/* SET TITLE */
jQuery(document).on("click", ".mybtnforassignaddons", function () {
  var id = jQuery(this).attr("data-id");
  var title = jQuery(this).attr("data-name");
  localStorage["serviceid"] = id;
  localStorage["title"] = title;
  window.location = "service-extra-addons.php";
});
/* UPDATE UNIT FOR MULTIPLE QTY  */
jQuery(document).on("change", ".txtaddon_multiple", function () {
  if (jQuery(this).prop("checked") == true) {
    multipleqty_for_addon = "Y";
  } else {
    multipleqty_for_addon = "N";
  }
});
/* Upload Addon Service Image */
/* UPLOAD ADDON SERVICE IMAGE */
jQuery(document).on("click", ".ct_upload_img2", function (e) {
  jQuery(".ct-loading-main").show();
  var imageuss = jQuery(this).attr("data-us");
  var imageids = jQuery(this).attr("data-imageinputid");
  var file_data = jQuery("#" + jQuery(this).attr("data-imageinputid")).prop("files")[0];
  var formdata = new FormData();
  var img_site_url = servObj.site_url;
  var imgObj_url = imgObj.img_url;
  var ctus = jQuery(this).attr("data-us");
  var img_w = jQuery("#" + ctus + "w").val();
  var img_h = jQuery("#" + ctus + "h").val();
  var img_x1 = jQuery("#" + ctus + "x1").val();
  var img_x2 = jQuery("#" + ctus + "x2").val();
  var img_y1 = jQuery("#" + ctus + "y1").val();
  var img_y2 = jQuery("#" + ctus + "y2").val();
  var img_name = jQuery("#" + ctus + "newname").val();
  var img_id = jQuery("#" + ctus + "id").val();
  formdata.append("image", file_data);
  formdata.append("w", img_w);
  formdata.append("h", img_h);
  formdata.append("x1", img_x1);
  formdata.append("x2", img_x2);
  formdata.append("y1", img_y1);
  formdata.append("y2", img_y2);
  formdata.append("newname", img_name);
  formdata.append("img_id", img_id);
  jQuery.ajax({
    url: ajax_url + "upload.php",
    type: "POST",
    data: formdata,
    cache: false,
    contentType: false,
    processData: false,
    success: function (data) {
      jQuery(".ct-loading-main").hide();
      if (data == "") {
        jQuery(".error-service").addClass("show");
        jQuery(".hidemodal").trigger("click");
      } else {
        jQuery("#" + ctus + "ctimagename").val(data);
        jQuery(".hidemodal").trigger("click");
        jQuery("#" + ctus + "addonimage").attr("src", imgObj_url + "services/" + data + "?" + Math.random());
        jQuery(".error_image").hide();
        jQuery("#" + ctus + "addonimage").attr("data-imagename", data);
      }
      jQuery("#"+imageids).val("");
    }
  });
});
/* INSERT NEW */
jQuery(document).on("click", ".btnaddon_save", function () {
  var addon_service_name = jQuery(".txtaddon_title").val();
  var addon_hours = jQuery(".txtaddon_hours").val();
  var addon_mints = jQuery(".txtaddon_mints").val();
  var base_price = jQuery(".txtaddon_baseprice").val();
  var maxqty = jQuery(".txtaddon_maxqty").val();
  var multi = multipleqty_for_addon;
  var image = jQuery("#pcaoctimagename").val();
  var predefineimage = jQuery("#cta_selected_addon").attr("data-name");
  var predefine_image_title = jQuery("#cta_selected_addon").attr("data-p_i_name");
  jQuery("#mynewformfor_insertaddons").validate();
  jQuery.validator.addMethod("pattern_title", function(value, element) {
    return this.optional(element) || /^[a-zA-Z '.'_@./#&+-]+$/.test(value);
  }, errorobj_enter_only_alphabets);
  jQuery("#mynewtitlefor_addons").rules("add",{
    required: true,
    messages: {required: errorobj_please_enter_title}
  });
  jQuery("#addon_add_hours").rules("add",{
    pattern_onlynumber: true, range:function(element){if (parseInt(jQuery("#addon_add_mints").val()) > 0){return [0,23];}else {return [0,24];}},
    messages: {pattern_onlynumber: errorobj_enter_only_digits, range:errorobj_please_enter_hours}
  });
  jQuery("#addon_add_mints").rules("add",{
    required: function(element) {if (parseInt(jQuery("#addon_add_hours").val()) > 0){return false;}else { return true;}}, pattern_onlynumber: true,range:function(element){if (parseInt(jQuery("#addon_add_hours").val()) > 0){return [0,59];}else {return [5,59];}},
    messages: {required: errorobj_please_enter_minutes, pattern_onlynumber: errorobj_enter_only_digits, range:errorobj_please_enter_minimum_5_minutes_maximum_59_minutes}
  });
  jQuery("#mynewbasepricefor_addons").rules("add",{
    required: true, pattern_price: true,
    messages: {required: errorobj_please_assign_price, pattern_price: errorobj_please_enter_valid_price}
  });
  jQuery("#mynewbasemaxqtyfor_addons").rules("add",{
    required: true, pattern_onlynumber: true,
    messages: {required: errorobj_please_assign_qty, pattern_price: errorobj_please_enter_valid_price}
  });
  if (!jQuery("#mynewformfor_insertaddons").valid()) {  return false; }
  jQuery(".ct-loading-main").show();
  if(predefineimage == "none"){
    predefineimage = "";
  }
  if(typeof predefineimage === "undefined"){
    predefineimage = "";
  }
  jQuery.ajax({
    type: "post",
    data: { "service_id": localStorage["serviceid"], "addon_service_name": addon_service_name, "addon_hours": addon_hours, "addon_mints": addon_mints, "base_price": base_price, "maxqty": maxqty, "image": image, "predefineimage": predefineimage, "predefineimage_title" : predefine_image_title, "multipleqty": multi, "status": "D", "operationinsert": 1 },
    url: ajax_url + "service_addons_ajax.php",
    success: function (res) {
      if(jQuery.trim(res) == 1){
        jQuery(".ct-loading-main").hide();
        jQuery(".mainheader_message_fail").show();
        jQuery(".mainheader_message_inner_fail").css("display", "inline");
        jQuery("#ct_sucess_message_fail").text(errorobj_sorry_unit_already_exist);
        jQuery(".mainheader_message_fail").fadeOut(3000);
      }
      else{
        jQuery(".mainheader_message").show();
        jQuery(".mainheader_message_inner").css("display", "inline");
        jQuery("#ct_sucess_message").text(errorobj_unit_inserted_successfully);
        jQuery(".mainheader_message").fadeOut(3000);
        jQuery(".ct-loading-main").hide();
        location.reload();
      }
    }
  });
});
/* UPDATE STATUS */
jQuery(document).on("change", ".myservices_addons_status", function () {
  if (jQuery(this).prop("checked") == true) {
    var id = jQuery(this).attr("data-id");
    jQuery(".ct-loading-main").show();
    jQuery.ajax({
      type: "post",
      data: { id: id, changestatus: "E" },
      url: ajax_url + "service_addons_ajax.php",
      success: function (res) {
        jQuery(".ct-loading-main").hide();
        jQuery(".mainheader_message").show();
        jQuery(".mainheader_message_inner").css("display", "inline");
        jQuery("#ct_sucess_message").text(errorobj_status_updated);
        jQuery(".mainheader_message").fadeOut(3000);
      }
    });
  } else {
    var id = jQuery(this).attr("data-id");
    jQuery(".ct-loading-main").show();
    jQuery.ajax({
      type: "post",
      data: { id: id, changestatus: "D"
      },
      url: ajax_url + "service_addons_ajax.php",
      success: function (res) {
        jQuery(".ct-loading-main").hide();
        jQuery(".mainheader_message").show();
        jQuery(".mainheader_message_inner").css("display", "inline");
        jQuery("#ct_sucess_message").text(errorobj_status_updated);
        jQuery(".mainheader_message").fadeOut(3000);
      }
    });
  }
});
/* DELETE DATA */
jQuery(document).on("click", ".service-addons-delete-button", function () {
  jQuery(".ct-loading-main").show();
  var id = jQuery(this).attr("data-serviceaddonid");
  jQuery.ajax({
    type: "post",
    data: { "deleteid": jQuery(this).attr("data-serviceaddonid"), "imagename": jQuery(this).attr("data-imagename") },
    url: ajax_url + "service_addons_ajax.php",
    success: function (res) {
      jQuery(".ct-loading-main").hide();
      jQuery(".mainheader_message").show();
      jQuery(".mainheader_message_inner").css("display", "inline");
      jQuery("#ct_sucess_message").text(errorobj_record_deleted_successfully);
      jQuery(".mainheader_message").fadeOut(3000);
      jQuery("#addons_service_"+id).fadeOut(1000);
    }
  });
});
/* UPDATE DATA */
jQuery(document).on("click", ".btneditaddon_service", function () {
  var edtid = jQuery(this).attr("data-id");
  var image = jQuery("#pcaol" + edtid + "ctimagename").val();
  var predefineimage = jQuery("#addonid_"+edtid).attr("data-name");
  var predefine_image_title = jQuery("#addonid_"+edtid).attr("data-p_i_name");
  var addon_hours = jQuery(".txtedtaddon_hours" + edtid).val();
  var addon_mints = jQuery(".txtedtaddon_mints" + edtid).val();
  jQuery("#myformedt_addons_" + edtid).validate();
  jQuery.validator.addMethod("pattern_title", function(value, element) {
    return this.optional(element) || /^[a-zA-Z '.'_@./#&+-]+$/.test(value);
  }, "Enter Only Alphabets");
  jQuery("#myedtaddon_title" + edtid).rules("add",{
    required: true,
    messages: {required: errorobj_please_enter_title}
  });
  jQuery("#addon_edit_hours" + edtid).rules("add",{
    pattern_onlynumber: true, range:function(element){if (parseInt(jQuery("#addon_edit_mints"+edtid).val()) > 0){return [0,23];}else {return [0,24];}},
    messages: {pattern_onlynumber: errorobj_enter_only_digits, range:errorobj_please_enter_hours}
  });
  jQuery("#addon_edit_mints" + edtid).rules("add",{
    required: function(element) {if (parseInt(jQuery("#addon_edit_hours"+edtid).val()) > 0){return false;}else { return true;}}, pattern_onlynumber: true,range:function(element){if (parseInt(jQuery("#addon_edit_hours"+edtid).val()) > 0){return [0,59];}else {return [5,59];}},
    messages: {required: errorobj_please_enter_minutes, pattern_onlynumber: errorobj_enter_only_digits, range:errorobj_please_enter_minimum_5_minutes_maximum_59_minutes}
  });
  jQuery("#myedtaddon_baseprice" + edtid).rules("add",{
    required: true, pattern_price: true,
    messages: {required: errorobj_please_assign_price, pattern_price: errorobj_please_enter_valid_price}
  });
  jQuery("#myedtaddon_maxqty" + edtid).rules("add",{
    required: true, pattern_onlynumber: true,
    messages: {required: errorobj_please_assign_qty, pattern_price: errorobj_please_enter_valid_price}
  });
  if (!jQuery("#myformedt_addons_" + edtid).valid()) { return false; }
  var title = jQuery(".txtedtaddon_title" + edtid).val();
  jQuery(".ct-loading-main").show();
  if(typeof predefineimage === "undefined"){
    predefineimage = "";
  }
  jQuery.ajax({
    type: "post",
    data: { "id": jQuery(this).attr("data-id"), "addon_service_name": jQuery(".txtedtaddon_title" + edtid).val(), "addon_hours": addon_hours, "addon_mints": addon_mints, "base_price": jQuery(".txtedtaddon_baseprice" + edtid).val(), "maxqty": jQuery(".txtedtaddon_maxqty" + edtid).val(), "image": image, "predefineimage": predefineimage, "predefineimage_title" : predefine_image_title,"addon_service_description": jQuery(".myedtaddon_titlenamedesc" + edtid).val() ,"operationedit": 1 },
    url: ajax_url + "service_addons_ajax.php",
    success: function (res) {
      jQuery(".mainheader_message").show();
      jQuery(".mainheader_message_inner").css("display", "inline");
      jQuery("#ct_sucess_message").text(errorobj_record_updated_successfully);
      jQuery(".ct-loading-main").hide();
      jQuery(".mainheader_message").fadeOut(3000);
      jQuery("#addons_service_name"+edtid).text(title);
      jQuery("#details_sp"+edtid).fadeOut();
      jQuery("#sp"+edtid).prop("checked",false);
      if(image==null || image==""){} else {
        jQuery(".cam_btn_addon"+edtid).removeClass("show");
        jQuery(".ser_addons"+edtid).hide();
        jQuery(".del_btn_addon"+edtid).addClass("show");
        jQuery(".addons_del_icon"+edtid).removeClass("show");
        jQuery(".addons_del_icon"+edtid).hide();
        jQuery(".error_image").hide();
      }
      location.reload();
    }
  });
});
/* UPDATE MULTIPLE SELCCETION OPTION */
jQuery(document).on("change", ".txtedtaddon_multipleqty", function (event) {
  if (jQuery(this).prop("checked") == true) {
    multipleqty_for_addon_edit = "Y";
    jQuery(".ct-loading-main").show();
    jQuery.ajax({
      type: "post",
      data: { "id": jQuery(this).attr("data-id"), "multipleqty": multipleqty_for_addon_edit, "operationedit_multipleqty": 1 },
      url: ajax_url + "service_addons_ajax.php",
      success: function (res) {
        jQuery(".ct-loading-main").hide();
      }
    });
    event.preventDefault();
  } else {
    multipleqty_for_addon_edit = "N";
    jQuery(".ct-loading-main").show();
    jQuery.ajax({
      type: "post",
      data: { "id": jQuery(this).attr("data-id"), "multipleqty": multipleqty_for_addon_edit, "operationedit_multipleqty": 1 },
      url: ajax_url + "service_addons_ajax.php",
      success: function (res) {
        jQuery(".ct-loading-main").hide();
      }
    });
    event.preventDefault();
  }
});
/* CODE FOR QTY RULES FOR ADDONS SERVICES */
/* LOAD ALL RULES OF QTY */
jQuery(document).on("click", ".addon-quantity-rules-btn", function () {
  var quantityno = jQuery(this).attr("data-id");
  jQuery(".ct-loading-main").show();
  jQuery.ajax({
    type: "post",
    data: { "addon_service_id": quantityno, "operation_getallqtyprice": 1 },
    url: ajax_url + "service_addons_ajax.php",
    success: function (res) {
      jQuery(".myaddonspricebyqty" + quantityno).html(res);
    }
  });
  jQuery(".manage-addon-price-container" + quantityno).fadeIn();
  jQuery(".ct-loading-main").hide();
});
/* DELETE THE RULE  */
jQuery(document).on("click", ".mynewrow_btndelete_addon", function () {
  jQuery(this).closest("li").remove();
});
/* DELETE THE RULE  */
jQuery(document).on("click", ".myloadedbtndelete_addons", function () {
  var delid = jQuery(this).attr("data-id");
  jQuery(".ct-loading-main").show();
  jQuery.ajax({
    type: "post",
    data: { "id": delid, "operationdelete_addonprice": 1 },
    url: ajax_url + "service_addons_ajax.php",
    success: function (res) {
      jQuery(".myaddon-qty_price_row" + delid).remove();
      jQuery(".ct-loading-main").hide();
      jQuery(".mainheader_message").show();
      jQuery(".mainheader_message_inner").css("display", "inline");
      jQuery("#ct_sucess_message").text(errorobj_qty_rule_deleted);
      jQuery(".mainheader_message").fadeOut(3000);
    }
  });
});
/* SAVE QTY RULE BUTTON */
jQuery(document).on("click", ".myloadedbtnsave_addons", function () {
  var editid = jQuery(this).attr("data-id");
  var qty = jQuery(".myloadedqty_addons" + editid).val();
  var rules = jQuery(".myloadedrules_addons" + editid).val();
  var price = jQuery(".myloadedprice_addons" + editid).val();

  /* service edit form validation */
  jQuery("#myedtform_addonunits" + editid).validate();
  jQuery("#myedtqty_addon" + editid).rules("add",{
    required: true, pattern_onlynumber: true,
    messages: {required: errorobj_please_enter_some_qty}
  });
  jQuery("#myedtprice_addon" + editid).rules("add",{
    required: true, pattern_price: true,
    messages: {required: errorobj_please_assign_price, pattern_price: errorobj_please_enter_valid_price}
  });
  if (!jQuery("#myedtform_addonunits" + editid).valid()) {return false;}
  jQuery(".ct-loading-main").show();
  jQuery.ajax({
    type: "post",
    data: { "editid": editid, "qty": qty, "rules": rules, "price": price, "operation_updateqtyprice_addon": 1 },
    url: ajax_url + "service_addons_ajax.php",
    success: function (res) {
      jQuery(".mainheader_message").show();
      jQuery(".ct-loading-main").hide();
      jQuery(".mainheader_message_inner").css("display", "inline");
      jQuery("#ct_success_message").text(errorobj_record_updated_successfully);
      jQuery(".mainheader_message").fadeOut(3000);
    }
  });
});
/* ADD NEW QTY RULE */
jQuery(document).on("click", ".mybtnaddnewqty_addon", function () {
  var id = jQuery(this).attr("data-id");
  var qty = jQuery(".mynewqty_addons" + id).val();
  var rules = jQuery(".mynewrules_addons" + id).val();
  var price = jQuery(".mynewprice_addons" + id).val();
  /* service edit form validation */
  jQuery("#mynewaddedform_addonunits"+id).validate();
  jQuery("#mynewaddedqty_addon"+id).rules("add",{
    required: true, pattern_onlynumber: true,
    messages: {required: errorobj_please_enter_some_qty}
  });
  jQuery("#mynewaddedprice_addon"+id).rules("add",{
    required: true, pattern_price: true,
    messages: {required: errorobj_please_assign_price, pattern_price: errorobj_please_enter_valid_price}
  });
  if (!jQuery("#mynewaddedform_addonunits"+id).valid()) { return false; }
  jQuery(".ct-loading-main").show();
  jQuery.ajax({
    type: "post",
    data: { "addon_id": id, "qty": qty, "rules": rules, "price": price, "operation_insertqtyprice_addon": 1 },
    url: ajax_url + "service_addons_ajax.php",
    success: function (ress) {
      jQuery.ajax({
        type: "post",
        data: { "addon_service_id": id, "operation_getallqtyprice": 1 },
        url: ajax_url + "service_addons_ajax.php",
        success: function (res) {
          jQuery(".myaddonspricebyqty" + id).html(res);
        }
      });
      jQuery(".manage-addon-price-container" + id).fadeIn();
      jQuery(".ct-loading-main").hide();
    }
  });
});
/* TIME SLOTS AVAILABILITY TAB */
/* MONTHLY WEEKLY TIME AVAILABILITY */
jQuery(document).on("change", ".weekly_monthly_slots", function () {
  jQuery(".ct-loading-main").show();
  var staff_id = jQuery(".login_user_id").attr("data-id");
  if (jQuery(this).prop("checked") == true) {
    jQuery.ajax({
      type: "post",
      data: { "values": "monthly", "staff_id": staff_id, "change_schedule_type": 1 },
      url: ajax_url + "weekday_ajax.php",
      success: function (res) {
        jQuery(".mainheader_message").show();
        jQuery(".mainheader_message_inner").css("display", "inline");
        jQuery("#ct_sucess_message").text(errorobj_schedule_updated_to_monthly);
        jQuery(".mainheader_message").fadeOut(3000);
        location.reload();
      }
    });
  } else {
    jQuery.ajax({
      type: "post",
      data: { "values": "weekly", "staff_id": staff_id, "change_schedule_type": 1 },
      url: ajax_url + "weekday_ajax.php",
      success: function (res) {
        jQuery(".mainheader_message").show();
        jQuery(".mainheader_message_inner").css("display", "inline");
        jQuery("#ct_sucess_message").html(errorobj_schedule_updated_to_weekly);
        jQuery(".mainheader_message").fadeOut(3000, location.reload());
        jQuery(".ct-loading-main").hide();
      }
    });
  }
});
/* UPDATE ALL ENTRY OF THE MONTHLY SCHEDULE */
jQuery(document).on("click", ".btnupdatenewtimeslots_monthly", function () {
  var values = jQuery(".prove_schedule_type").text();
  if(values==""){
    values="weekly";
  }
  jQuery(".ct-loading-main").show();
  var staff_id = jQuery(".login_user_id").attr("data-id");
  var starttimenew = [];
  var endtimenew = [];
  var chkdaynew = [];
  jQuery(".chkdaynew").each(function () {
    if (jQuery(this).prop("checked") == true) {
      chkdaynew.push("N");
    } else {
      chkdaynew.push("Y");
    }
  });
  jQuery(".starttimenew").each(function () {
    starttimenew.push(jQuery(this).val());
  });
  jQuery(".endtimenew").each(function () {
    endtimenew.push(jQuery(this).val());
  });
  var st = starttimenew.filter(function (v) {
    return v !== ""
  });
  var et = endtimenew.filter(function (v) {
    return v !== ""
  });
  var s = 1;
  for(var i = 0;i<=starttimenew.length;i++){
    if(starttimenew[i] > endtimenew[i]){
      s++;
    }
  }
  if(s>1){
    jQuery(".mainheader_message_fail").show();
    jQuery(".mainheader_message_inner_fail").css("display","inline");
    jQuery("#ct_sucess_message_fail").html(errorobj_please_select_porper_time_slots);
    jQuery(".mainheader_message_fail").fadeOut(5000);
    jQuery(".ct-loading-main").hide();
  } else{
    jQuery.ajax({
      type: "post",
      data: { "chkday": chkdaynew, "starttime": st, "endtime": et, "staff_id": staff_id, "values": values, "operation_insertmonthlyslots": 1 },
      url: ajax_url + "weekday_ajax.php",
      success: function (res) {
        jQuery(".ct-loading-main").hide();
        jQuery(".mainheader_message").show();
        jQuery(".mainheader_message_inner").css("display", "inline");
        jQuery("#ct_sucess_message").text(errorobj_time_slots_updated_successfully);
        jQuery(".mainheader_message").fadeOut(3000);
        location.reload();
      }
    });
  }
});
/* TIME SLOTS OFF TIMES TAB */
/* ADD OF TIME */
jQuery(document).on("click", "#add_break", function () {
  jQuery(".ct-loading-main").show();
  var staff_id = jQuery(".login_user_id").attr("data-id");
  var startdate = offtime_startDate.format('YYYY-MM-DD HH:mm');
  var enddate = offtime_endDate.format('YYYY-MM-DD HH:mm');
  var dataString = { startdate: startdate, enddate: enddate, staff_id: staff_id, add_offtime: 1 };
  jQuery.ajax({
    type: "post",
    url: ajax_url + "weekday_ajax.php",
    data: dataString,
    success: function (res) {
      if(res == "ok")
      {
          jQuery(".mainheader_message").show();
          jQuery(".mainheader_message_inner").css("display", "inline");
          jQuery("#ct_sucess_message").text("This Offtime is already exist. Plase select another Offtime.");
          jQuery(".mainheader_message").fadeOut(13000);
          jQuery(".ct-loading-main").hide();
      }
      else
      {
      jQuery.ajax({
        type: "post",
        data: { staff_id: staff_id, getmy_offtimes: 1 },
        url: ajax_url + "weekday_ajax.php",
        success: function (res) {
          jQuery(".mytbodyfor_offtimes").html(res);
          jQuery(".mainheader_message").show();
          jQuery(".mainheader_message_inner").css("display", "inline");
          jQuery("#ct_sucess_message").text(errorobj_off_time_added_successfully);
          jQuery(".mainheader_message").fadeOut(3000);
          jQuery(".ct-loading-main").hide();
          }
        });
       }
    }
  });
});
/* DELETE OFFTIME */
jQuery(document).on("click", ".ct_delete_provider", function () {
  jQuery(".ct-loading-main").show();
  var id = jQuery(this).attr("data-id");
  var dataString = { id: id, delete_offtime: 1 };
  jQuery.ajax({
    type: "post",
    url: ajax_url + "weekday_ajax.php",
    data: dataString,
    success: function (response) {
      jQuery("#myofftime_" + id).remove();
      jQuery(".mainheader_message").show();
      jQuery(".mainheader_message_inner").css("display", "inline");
      jQuery("#ct_sucess_message").text(response);
      jQuery(".mainheader_message").fadeOut(3000);
      jQuery(".ct-loading-main").hide();
    }
  });
});
/* TIME SLOTS AND BREAK TAB */
/*  ADD BREAKS IN STAFFS   */
jQuery(document).on("click", ".myct-add-staff-breaks", function () {
  jQuery(".ct-loading-main").show();
  var id = jQuery(this).attr("data-id");
  var staff_id = jQuery(this).attr("data-staff_id");
  var weekid = jQuery(this).attr("data-weekid");
  var weekday = jQuery(this).attr("data-weekday");
  /* insert the record in the table and then after fill in new li */
  jQuery.ajax({
    type: "post",
    data: { weekid: weekid, weekday: weekday, staff_id: staff_id, starttime: "10:00:00", endtime: "20:00:00", newaddbreak: 1 },
    url: ajax_url + "weekday_ajax.php",
    success: function (res) {
      jQuery("#ct-add-break-ul" + id).append(res);
      jQuery(".ct-loading-main").hide();
    }
  });
});
jQuery(document).on("change",".selectpickerstart",function(){
  var id = jQuery(this).attr("data-id");
  var weekid = jQuery(this).attr("data-weekid");
  var weekday = jQuery(this).attr("data-weekday");
  var starttime = jQuery(this).val();
  /* update the time in start time */
  jQuery.ajax({
    type : "post",
    data : { id : id, weekid : weekid, weekday : weekday, start_new_time : starttime, editstarttime_break : 1 },
    url : ajax_url+"weekday_ajax.php",
    success  :function(res) {   
      if(jQuery.trim(res)=="done"){
        jQuery(".mainheader_message").show();
        jQuery(".mainheader_message_inner").css("display","block");
        jQuery("#ct_sucess_message").html(errorobj_start_break_time_updated);
        jQuery(".mainheader_message").fadeOut(5000);
      }else{
        jQuery(".mainheader_message_fail").show();
        jQuery(".mainheader_message_inner_fail").css("display","block");
        jQuery("#ct_sucess_message_fail").html(errorobj_please_select_time_between_day_availability_time);
        jQuery(".mainheader_message_fail").fadeOut(5000);
      }
    }
  });
});
/* UPDATE THE SELECTED TIME IN THE TABLE OF THE END BREAK TIME */
jQuery(document).on("change",".selectpickerend",function(){
  var id = jQuery(this).attr("data-id");
  var weekid = jQuery(this).attr("data-weekid");
  var weekday = jQuery(this).attr("data-weekday");
  var endtime = jQuery(this).val();
  var brstarttime=jQuery("#start_break_"+id+"_"+weekid+"_"+weekday).val();
  if(endtime < brstarttime){
    jQuery(".mainheader_message_fail").show();
    jQuery(".mainheader_message_inner_fail").css("display","inline");
    jQuery("#ct_sucess_message_fail").html(errorobj_break_end_time_should_be_greater_than_start_time);
    jQuery(".mainheader_message_fail").fadeOut(5000);
  }else{
    /* update the time in end time */
    jQuery.ajax({
      type : "post",
      data : { id : id, weekid : weekid, weekday : weekday, end_new_time : endtime, editendtime_break : 1 },
      url : ajax_url+"weekday_ajax.php",
      success  :function(res) {
        if(jQuery.trim(res)=="End Break Time Updated"){
          jQuery(".mainheader_message").show();
          jQuery(".mainheader_message_inner").css("display","inline");
          jQuery("#ct_sucess_message").html(errorobj_end_break_time_updated);
          jQuery(".mainheader_message").fadeOut(5000);
        }else{
          jQuery(".mainheader_message_fail").show();
          jQuery(".mainheader_message_inner_fail").css("display","inline");
          jQuery("#ct_sucess_message_fail").html(errorobj_please_select_time_between_day_availability_time);
          jQuery(".mainheader_message_fail").fadeOut(5000);
        }
      }
    });
  }
});
/* DELETE BREAKS */
jQuery(document).on("click",".mybtndelete_breaks",function(){
  jQuery(".ct-loading-main").show();
  var id = jQuery(this).attr("data-break_id");
  jQuery.ajax({
    type : "post",
    data : { id : id, delete_off_breaks : 1 },
    url : ajax_url+"weekday_ajax.php",
    success : function(res){
      jQuery(".ct-loading-main").hide();
    }
  });
  jQuery(this).closest("li").remove();
});
/* COINFIRM NOTIFICATION AND MAKE IT UPADTE ITS STATUS TO READED */
jQuery(document).on("click", ".notificationli", function () {
  var orderid = jQuery(this).attr("data-orderid");
  var booking_status = jQuery(this).attr("data-booking_status");
  if(booking_status == "GC"){
    jQuery.ajax({
      type: "post",
      data: {orderid: orderid, getgc_event_detail: 1},
      url: ajax_url + "my_appoint_ajax.php",
      success: function (res) {
        jQuery(".booking-details-index-dashboard").html(res);
        jQuery("#booking-details-dashboard").modal();
        jQuery("#ct-notification-container").hide();
      }
    });
  }else{
    jQuery.ajax({
      type: "post",
      data: {orderid: orderid, getcleintdetailwith_updatereadstatus: 1},
      url: ajax_url + "my_appoint_ajax.php",
      success: function (res) {
        jQuery(".booking-details-index-dashboard").html(res);
        jQuery("#booking-details-dashboard").modal();
        jQuery("#ct-notification-container").hide();
      }
    });
  }
});
/* FULL CALENDAR */
/* FULL CALENDAR CONFIRM */
/* CONFIRM FOR NOTIFICATION */
jQuery(document).on("click", ".ct-confirm-appointment", function (e) {
  if(check_update_if_btn == "0"){
    check_update_if_btn = "1";
    e.preventDefault();
    var data_id = jQuery(this).attr("data-id");
    jQuery.ajax({
      type: "POST",
      data: { id: data_id, confirm_booking: 1 },
      url: ajax_url + "my_appoint_ajax.php",
      success: function (response) {
        check_update_if_btn = "0";
        jQuery(".mainheader_message").show();
        jQuery(".mainheader_message_inner").css("display", "inline");
        jQuery("#ct_sucess_message").text(errorobj_appointment_booking_confirm);
        jQuery(".mainheader_message").fadeOut(3000);
        jQuery("#info_modal_close").trigger("click");
        jQuery("#updateinfo_modal_close").trigger("click");
        jQuery(".closesss").trigger("click");
        location.reload();
      }
    });
  }
});
/* COMPLETE FOR NOTIFICATION */
jQuery(document).on("click", ".ct-complete-appointment", function (e) {
  jQuery(".ct-loading-main").show();
  var data_id = jQuery(this).attr("data-id");
  jQuery.ajax({
    type: "POST",
    data: { order_id: data_id, complete_booking: 1 },
    url: ajax_url + "my_appoint_ajax.php",
    success: function (response) {
      jQuery(".mainheader_message").show();
      jQuery(".mainheader_message_inner").css("display", "inline");
      jQuery("#ct_sucess_message").text(errorobj_appointment_booking_completed);
      jQuery(".mainheader_message").fadeOut(3000);
      jQuery("#info_modal_close").trigger("click");
      jQuery("#updateinfo_modal_close").trigger("click");
      jQuery(".closesss").trigger("click");
      location.reload();
    }
  });
});
/* Confirm in calendar */
jQuery(document).on("click", ".ct-confirm-appointment-cal", function (e) {
  jQuery(".ct-loading-main").show();
  if(check_update_if_btn == "0"){
    check_update_if_btn = "1";
    e.preventDefault();
    var data_id = jQuery(this).attr("data-id");
    jQuery.ajax({
      type: "POST",
      data: { id: data_id, confirm_booking_cal: 1 },
      url: ajax_url + "my_appoint_ajax.php",
      success: function (response) {
        check_update_if_btn = "0";
        jQuery(".mainheader_message").show();
        jQuery(".mainheader_message_inner").css("display", "inline");
        jQuery("#ct_sucess_message").text(errorobj_appointment_booking_confirm);
        jQuery(".mainheader_message").fadeOut(3000);
        jQuery("#info_modal_close").trigger("click");
        jQuery("#updateinfo_modal_close").trigger("click");
        jQuery(".closesss").trigger("click");
        location.reload();
      }
    });
  }
});
/* COMPLETE FOR CALENDAR */
jQuery(document).on("click", ".ct-complete-appointment-cal", function (e) {
  jQuery(".ct-loading-main").show();
  var data_id = jQuery(this).attr("data-id");
  jQuery.ajax({
    type: "POST",
    data: { order_id: data_id, complete_booking: 1 },
    url: ajax_url + "my_appoint_ajax.php",
    success: function (response) {
      jQuery(".mainheader_message").show();
      jQuery(".mainheader_message_inner").css("display", "inline");
      jQuery("#ct_sucess_message").text(errorobj_appointment_booking_completed);
      jQuery(".mainheader_message").fadeOut(3000);
      jQuery("#info_modal_close").trigger("click");
      jQuery("#updateinfo_modal_close").trigger("click");
      jQuery(".closesss").trigger("click");
      location.reload();
    }
  });
});
/* REJECT BOOKINGS */
jQuery(document).on("click", ".reject_bookings", function (e) {
  jQuery(".ct-loading-main").show();
  if(check_update_if_btn == "0"){
    check_update_if_btn = "1";
    e.preventDefault();
    var booking_id = jQuery(this).attr("data-id");
    var reject_reason_book = jQuery("#reason_reject" + booking_id).val();
    var pid = jQuery(this).attr("data-pid");
    var gc_event_id = jQuery(this).attr("data-gc_event");
    var gc_staff_event_id = jQuery(this).attr("data-gc_staff_event");
    var dataString = { order_id: booking_id, pid: pid, gc_event_id: gc_event_id, gc_staff_event_id: gc_staff_event_id, reject_reason_book: reject_reason_book, reject_booking: 1 };
    jQuery.ajax({
      type: "POST",
      url: ajax_url + "my_appoint_ajax.php",
      data: dataString,
      success: function (response) {
        jQuery(".mainheader_message").show();
        jQuery(".mainheader_message_inner").css("display", "inline");
        jQuery("#ct_sucess_message").text(errorobj_appointment_booking_rejected);
        jQuery(".mainheader_message").fadeOut(3000);
        jQuery("#info_modal_close").trigger("click");
        jQuery("#updateinfo_modal_close").trigger("click");
        jQuery(".closesss").trigger("click");
        location.reload();
      }
    });
  }
});
jQuery(document).on("click", ".mybtndelete_booking", function () {
  var order = jQuery(this).attr("data-id");
  jQuery.ajax({
    type: "POST",
    data: { id: order, delete_booking: 1 },
    url: ajax_url + "my_appoint_ajax.php",
    success: function (response) {
      jQuery(".mainheader_message").show();
      jQuery(".mainheader_message_inner").css("display", "inline");
      jQuery("#ct_sucess_message").text(errorobj_booking_deleted);
      jQuery(".mainheader_message").fadeOut(3000);
      jQuery("#info_modal_close").trigger("click");
      jQuery("#updateinfo_modal_close").trigger("click");
      jQuery(".closesss").trigger("click");
      location.reload();
    }
  });
});
jQuery(document).on("click", ".delete_bookings", function () {
  jQuery(".ct-loading-main").show();
  var order = jQuery(this).attr("data-id");
  var gc_event_id = jQuery(this).attr("data-gc_event");
  var gc_staff_event_id = jQuery(this).attr("data-gc_staff_event");
  var pid = jQuery(this).attr("data-pid");
  jQuery.ajax({
    type: "POST",
    data: { id: order, pid: pid, gc_event_id: gc_event_id, gc_staff_event_id: gc_staff_event_id, delete_booking: 1 },
    url: ajax_url + "my_appoint_ajax.php",
    success: function (response) {
      jQuery(".mainheader_message").show();
      jQuery(".mainheader_message_inner").css("display", "inline");
      jQuery("#ct_sucess_message").text(errorobj_booking_deleted);
      jQuery(".mainheader_message").fadeOut(3000);
      jQuery("#info_modal_close").trigger("click");
      jQuery("#updateinfo_modal_close").trigger("click");
      jQuery(".closesss").trigger("click");
      location.reload();
    }
  });
});
/* DELETE FUNCTION TO DELETE THE RECORD */
function deletedata(id, url) {
  jQuery.ajax({
    type: "post",
    data: { "deleteid": id },
    url: url,
    success: function (res) {
      jQuery(".mainheader_message").show();
      jQuery(".mainheader_message_inner").css("display", "inline");
      jQuery("#ct_sucess_message").text(errorobj_record_deleted_successfully);
      jQuery(".mainheader_message").fadeOut(3000);
    }
  });
}
/* ***************Setting Page******************** */
/*  Use For update Company Details  */
jQuery(document).on("click", "#company_setting", function () {
  var time_zone = jQuery("#time-zone").val();
  var sel_language = jQuery("#display_language_user").val();
  var company_name = jQuery("#company_name").val();
  var company_email = jQuery("#company_email").val();
  var company_address = jQuery("#company_address").val();
  var company_city = jQuery("#company_city").val();
  var company_state = jQuery("#company_state").val();
  var company_zipcode = jQuery("#company_zip").val();
  var company_country = jQuery("#company_country").val();
  var company_country_code = jQuery(".numbercode").text()+","+jQuery(".alphacode").text()+","+jQuery(".selected-flag").attr("title");
  var company_logo = jQuery("#ctsictimagename").val();
  var company_phone = jQuery(".company_country_code_value").text()+""+jQuery("#company_phone").val();
  var dataString = { time_zone: time_zone, sel_language: sel_language, company_name: company_name, company_email: company_email, company_address: company_address, company_city: company_city, company_state: company_state, company_zipcode: company_zipcode, company_country: company_country, company_country_code: company_country_code, company_logo: company_logo, company_phone : company_phone, action: "update_company_setting" };
  if (jQuery(".error_image").is(":visible")) {
    var dataString = { time_zone: time_zone, sel_language: sel_language, company_name: company_name, company_email: company_email, company_address: company_address, company_city: company_city, company_state: company_state, company_zipcode: company_zipcode, company_country: company_country, company_country_code: company_country_code, company_phone : company_phone, action: "update_company_setting" };
    jQuery(".ct-loading-main").show();
    if (jQuery("#business_setting_form").valid()) {
      jQuery.ajax({
        type: "POST",
        url: ajax_url + "setting_ajax.php",
        data: dataString,
        success: function (response) {
          jQuery(".ct-loading-main").hide();
          if(jQuery.trim(response)=="updated"){
            jQuery(".mainheader_message").show();
            jQuery(".mainheader_message_inner").css("display","inline");
            jQuery("#ct_sucess_message").text(errorobj_updated_company_details);
            jQuery(".mainheader_message").fadeOut(3000);
            if(company_logo==null || company_logo==""){}else{
              jQuery(".set_newcam_icon").removeClass("show");
              jQuery(".set_newcam_icon").hide();
              jQuery(".del_btn").show();
              jQuery(".del_btn").addClass("show");
              jQuery(".del_set_popup").hide();
            }
          }
		  location.reload();
        }
      });
    }else{
      jQuery(".ct-loading-main").hide();
    }
  } else{ 
    jQuery(".ct-loading-main").show();
    if (jQuery("#business_setting_form").valid()) {
      jQuery.ajax({
        type: "POST",
        url: ajax_url + "setting_ajax.php",
        data: dataString,
        success: function (response) {
          jQuery(".ct-loading-main").hide();
          if(jQuery.trim(response)=="updated"){
            jQuery(".mainheader_message").show();
            jQuery(".mainheader_message_inner").css("display","inline");
            jQuery("#ct_sucess_message").text(errorobj_updated_company_details);
            jQuery(".mainheader_message").fadeOut(3000);
            if(company_logo==null || company_logo==""){}else{
              jQuery(".set_newcam_icon").removeClass("show");
              jQuery(".set_newcam_icon").hide();
              jQuery(".del_btn").show();
              jQuery(".del_btn").addClass("show");
              jQuery(".del_set_popup").hide();
            }
          }
		  location.reload();
        }
      });
    }else{
      jQuery(".ct-loading-main").hide();
    }
  }
});
jQuery(document).on("click", "#patial-deposit", function () {
  var partialamount_check = jQuery(this).prop("checked");
  if (partialamount_check == true) {
    if(payment_status == "off"){
      jQuery("#ct-partial-depost_error").show();
    }
  } else{
    jQuery("#ct-partial-depost_error").hide();
  }
});
/*  Use For update General Setting  */
jQuery(document).on("click", "#general_setting", function () {
  jQuery(".ct-loading-main").show();
  var time_interval = jQuery("#time_interval").val();
  var min_advanced_booking = jQuery("#ct_min_advance_booking_time").val();
  var max_advanced_booking = jQuery("#ct_max_advance_booking_time").val();
  if(max_advanced_booking == ""){}
  var booking_padding_time = "";
  var service_padding_time_before = "";
  var service_padding_time_after = "";
  var cancelled_buffer_time = jQuery("#ct_cancellation_buffer_time").val();
  var reshedule_buffer_time = jQuery("#ct_reshedule_buffer_time").val();
  var currency = jQuery("#ct_currency").val();
  var currency_symbol_position = jQuery("#ct_currency_symbol_position").val();
  var ct_service_design = jQuery("#ct_service_design").val();
  var ct_booking_page_design = jQuery("#ct_booking_page_design").val();
  var price_format_decimal_places = jQuery("#ct_price_format_decimal_places").val();
  var ct_postal_code = jQuery("#ct_postal_code").val();
  
  var tax_vat = jQuery("#tax-vat").prop("checked");
  var tax_vat_1 = "N";
  if (tax_vat == true) {
    tax_vat_1 = "Y";
  }
  var postal_code = jQuery("#postalcode").prop("checked");
  var postal_code_1 = "N";
  if (postal_code == true) {
    postal_code_1 = "Y";
  }
  var per_flatfree = jQuery("#tax-vat-percentage").prop("checked");
  var percent_flatfree = "F";
  if (per_flatfree == true) {
    percent_flatfree = "P";
  }
  var tax_vat_value = jQuery("#ct_tax_vat_value").val();
  var partial_deposit = jQuery("#patial-deposit").prop("checked");
  var status_partial = "N";
  if (partial_deposit == true) {
    if(payment_status == "on"){
      status_partial = "Y";
    }
  }
  var partial_per_flatfree = jQuery("#partial-percentage").prop("checked");
  var partial_percent_flatfree = "F";
  if (partial_per_flatfree == true) {
    partial_percent_flatfree = "P";
  }
  var partial_deposit_amount = jQuery("#ct_partial_deposit_amount").val();
  var partial_deposit_message = jQuery("#ct_partial_deposit_message").val();
  var thanks_url = encodeURIComponent(jQuery("#ct_thankyou_page_url").val());
  var google_api_key = jQuery("#ct_google_api_key").val();
  var minimum_booking_price = jQuery("#ct_minimum_booking_price").val();
  var cancel_policy = jQuery("#cancel-policy").prop("checked");
  var cancel_policy_status = "N";
  if (cancel_policy == true) {
    cancel_policy_status = "Y";
  }
  jQuery("#general_setting_form").validate({
    rules: {
      ct_thankyou_page_url: {urlss: true},
      ct_terms_condition_header: {urlss: true},
      ct_privacy_policy_link: {urlss: true},
      ct_postal_code : {required : true}
    },
    messages: {
      ct_thankyou_page_url: {urlss: errorobj_enter_valid_url},
      ct_terms_condition_header: {urlss: errorobj_enter_valid_url},
      ct_privacy_policy_link: {urlss: errorobj_enter_valid_url},
      ct_postal_code: {required: errorobj_you_can_only_use_valid_zipcode}
    }
  });
  var cancel_policy_header = jQuery("#ct_cancel_policy_header").val();
  var cancel_policy_textarea = jQuery("#ct_cancel_policy_textarea").val();
  var calculation_policy = jQuery("#ct_price_calculation_method").val();
  var allow_multiple_booking_for_timeslot = jQuery("#multiple-booking-same-time").prop("checked");
  var allow_multiple_booking_for_same_timeslot = "N";
  if (allow_multiple_booking_for_timeslot == true) {
    allow_multiple_booking_for_same_timeslot = "Y";
  }
  var appointment_auto_confirm = jQuery("#appointment-auto-confirm").prop("checked");
  var appointment_auto_confirmation = "N";
  if (appointment_auto_confirm == true) {
    appointment_auto_confirmation = "Y";
  }
  var star_show_on_front = jQuery("#star_show_on_front").prop("checked");
  var star_show_on_frontend = "N";
  if (star_show_on_front == true) {
    star_show_on_frontend = "Y";
  }
  var staff_registss = jQuery("#ct_staff_regist").prop("checked");
  var staff_regist = "N";
  if (staff_registss == true) {
    staff_regist = "Y";
  }
  var time_overlap_booking = jQuery("#allow-dc-overlap-booking").prop("checked");
  var allow_time_overlap_booking = "N";
  if (time_overlap_booking == true) {
    allow_time_overlap_booking = "Y";
  }
  var terms_condition = jQuery("#allow-dc-terms-condition").prop("checked");
  var allow_terms_and_condition = "N";
  if (terms_condition == true) {
    allow_terms_and_condition = "Y";
  }
  var privacy_policy = jQuery("#allow-dc-privacy_policy").prop("checked");
  var allow_privacy_policy = "N";
  if (privacy_policy == true) {
    allow_privacy_policy = "Y";
  }
  var front_desc = jQuery("#ct_allow_front_desc").prop("checked");
  var ct_allow_front_desc = "N";
  if (front_desc == true) {
    ct_allow_front_desc = "Y";
  }
  var ct_user_zip_code_ch = jQuery("#ct_user_zip_code").prop("checked");
  var ct_user_zip_code = "N";
  if (ct_user_zip_code_ch == true) {
    ct_user_zip_code = "Y";
  }
  var ct_cart_scrollable = "Y";
  var ct_addons_default_design = jQuery("#ct_addons_default_design").val();
  var ct_method_default_design = jQuery("#ct_method_default_design").val();
  var ct_service_default_design = jQuery("#ct_service_default_design").val();
  var ct_terms_condition_link = encodeURIComponent(jQuery("#ct_terms_condition_header").val());
  var ct_privacy_policy_link = encodeURIComponent(jQuery("#ct_privacy_policy_link").val());
  var ct_front_desc = encodeURIComponent(jQuery("#ct_front_desc").val());
  var additional_slot_time = jQuery("#ct_additional_slot_time").val();
  var dataString = { time_interval: time_interval, ct_allow_privacy_policy: allow_privacy_policy, ct_privacy_policy_link: ct_privacy_policy_link, ct_addons_default_design : ct_addons_default_design, ct_method_default_design : ct_method_default_design, ct_service_default_design : ct_service_default_design, ct_cart_scrollable : ct_cart_scrollable, ct_terms_condition_link : ct_terms_condition_link, min_advanced_booking: min_advanced_booking, ct_allow_front_desc : ct_allow_front_desc, max_advanced_booking: max_advanced_booking, booking_padding_time: booking_padding_time, service_padding_time_before: service_padding_time_before, service_padding_time_after: service_padding_time_after, cancelled_buffer_time: cancelled_buffer_time, reshedule_buffer_time: reshedule_buffer_time, currency: currency, currency_symbol_position: currency_symbol_position,ct_service_design:ct_service_design ,price_format_decimal_places: price_format_decimal_places, tax_vat_1: tax_vat_1, postal_code_1: postal_code_1, percent_flatfree: percent_flatfree, tax_vat_value: tax_vat_value, status_partial: status_partial, partial_percent_flatfree:partial_percent_flatfree, partial_deposit_amount: partial_deposit_amount, partial_deposit_message: partial_deposit_message, thanks_url: thanks_url, cancel_policy_status:cancel_policy_status, cancel_policy_header:cancel_policy_header, cancel_policy_textarea:cancel_policy_textarea, allow_multiple_booking_for_same_timeslot: allow_multiple_booking_for_same_timeslot, appointment_auto_confirmation: appointment_auto_confirmation, star_show_on_frontend: star_show_on_frontend, allow_time_overlap_booking: allow_time_overlap_booking, allow_terms_and_condition: allow_terms_and_condition, ct_postal_code : ct_postal_code, ct_front_desc : ct_front_desc, ct_calculation_policy : calculation_policy, ct_user_zip_code : ct_user_zip_code,ct_booking_page_design : ct_booking_page_design, google_api_key : google_api_key,minimum_booking_price : minimum_booking_price, ct_additional_slot_time:additional_slot_time, staff_regist:staff_regist, action: "update_general_setting" };
  if (jQuery("#general_setting_form").valid()) {
    jQuery.ajax({
      type: "POST",
      url: ajax_url + "setting_ajax.php",
      data: dataString,
      success: function (response) {
        jQuery(".ct-loading-main").hide();
        if(jQuery.trim(response)=="updated"){
          jQuery(".mainheader_message").show();
          jQuery(".mainheader_message_inner").css("display","inline");
          jQuery("#ct_sucess_message").text(errorobj_updated_general_settings);
          jQuery(".mainheader_message").fadeOut(3000);
        }
        location.reload();
      }
    });
  }
  else{
    jQuery(".ct-loading-main").hide();
  }
});
/* BELOW CODE IS TO SAVE SMS SETTINGS */
jQuery(document).on("click", "#btnsave_sms_service", function () {
  var sms_status = jQuery(".mysms_service_status").prop("checked");
  var sms_service_status = "N";
  if (sms_status == true) {
    sms_service_status = "Y";
  }
  var send_to_client = jQuery("#ct-sms-reminder-client-status").prop("checked");
  var send_sms_to_client_status = "N";
  if (send_to_client == true) {
    send_sms_to_client_status = "Y";
  }
  var send_to_admin = jQuery("#ct-sms-reminder-admin-status").prop("checked");
  var send_sms_to_admin_status = "N";
  if (send_to_admin == true) {
    send_sms_to_admin_status = "Y";
  }
  var send_to_staff = jQuery("#ct-sms-reminder-staff-status").prop("checked");
  var send_sms_to_staff_status = "N";
  if (send_to_staff == true) {
    send_sms_to_staff_status = "Y";
  }
  /* PLIVO SETTINGS */
  var send_to_client_plivo = jQuery("#ct-sms-reminder-client-status-plivo").prop("checked");
  var send_sms_to_client_plivo_status = "N";
  if (send_to_client_plivo == true) {
    send_sms_to_client_plivo_status = "Y";
  }
  var send_to_admin_plivo = jQuery("#ct-sms-reminder-admin-status-plivo").prop("checked");
  var send_sms_to_admin_plivo_status = "N";
  if (send_to_client_plivo == true) {
    send_sms_to_admin_plivo_status = "Y";
  }
  var send_to_staff_plivo = jQuery("#ct-sms-reminder-staff-status-plivo").prop("checked");
  var send_sms_to_staff_plivo_status = "N";
  if (send_to_staff_plivo == true) {
    send_sms_to_staff_plivo_status = "Y";
  }
  /* PLIVO STATUS */
  var plivo_status = jQuery("#sms-noti-plivo").prop("checked");
  var sms_plivo_status = "N";
  if (plivo_status == true) {
    sms_plivo_status = "Y";
  }
  /*  TWILIO STATUS */
  var twilio_status = jQuery("#sms-noti-twilio").prop("checked");
  var sms_twilio_status = "N";
  if (twilio_status == true) {
    sms_twilio_status = "Y";
  }
  var sms_plivo_account_sid = jQuery("#myplivo_account_sid").val();
  var sms_plivo_auth_token = jQuery("#myplivo_auth_token").val();
  var country_phone_code = jQuery(".company_country_code_value_twilio").text();
  var sms_plivo_sender_number = "";
  if(jQuery("#myplivo_sender_number").val().indexOf(country_phone_code)){
    sms_plivo_sender_number = jQuery("#myplivo_sender_number").val();
  } else {
    sms_plivo_sender_number = jQuery(".company_country_code_value_plivo").text()+""+jQuery("#myadmin_phone_number_plivo").val();
  }
  var sms_plivo_admin_phone_number = jQuery(".company_country_code_value_plivo").text()+""+jQuery("#myadmin_phone_number_plivo").val();
  var sms_twilio_account_sid = jQuery("#mytwilio_account_sid").val();
  var sms_twilio_auth_token = jQuery("#mytwilio_auth_token").val();
  var sms_twilio_sender_number = jQuery("#mytwilio_sender_number").val();
  var sms_twilio_admin_phone_number = jQuery(".company_country_code_value_twilio").text()+""+jQuery("#myadmin_phone_number").val();
  /* Nexmo STATUS */
  var nexmo_status = jQuery("#sms-noti-nexmo").prop("checked");
  var sms_nexmo_status = "N";
  if (nexmo_status == true) {
    sms_nexmo_status = "Y";
  }
  var sms_nexmo_api_key = jQuery("#ct_nexmo_api_key").val();
  var sms_nexmo_api_secret = jQuery("#ct_nexmo_api_secret").val();
  var sms_nexmo_from = jQuery("#ct_nexmo_from").val();
  var nexmo_statuss = jQuery("#ct_nexmo_status").prop("checked");
  var sms_nexmo_statuss = "N";
  if (nexmo_statuss == true) {
    sms_nexmo_statuss = "Y";
  }
  var nexmo_statu_send_client = jQuery("#ct_sms_nexmo_send_sms_to_client_status").prop("checked");
  var sms_nexmo_statu_send_client = "N";
  if (nexmo_statu_send_client == true) {
    sms_nexmo_statu_send_client = "Y";
  }
  var nexmo_statu_send_admin = jQuery("#ct_sms_nexmo_send_sms_to_admin_status").prop("checked");
  var sms_nexmo_statu_send_admin = "N";
  if (nexmo_statu_send_admin == true) {
    sms_nexmo_statu_send_admin = "Y";
  }
  var nexmo_statu_send_staff = jQuery("#ct_sms_nexmo_send_sms_to_staff_status").prop("checked");
  var sms_nexmo_statu_send_staff = "N";
  if (nexmo_statu_send_staff == true) {
    sms_nexmo_statu_send_staff = "Y";
  }
  var sms_nexmo_admin_phone = jQuery("#ct_sms_nexmo_admin_phone_number").val();
  /*  TEXTLOCAL STATUS */
  var textlocal_status = jQuery("#sms-noti-textlocal").prop("checked");
  var sms_textlocal_status = "N";
  if (textlocal_status == true) {
    sms_textlocal_status = "Y";
  }
  var textlocal_status_send_admin = jQuery("#ct-textlocal-sms-reminder-admin-status").prop("checked");
  var sms_textlocal_status_send_admin = "N";
  if (textlocal_status_send_admin == true) {
    sms_textlocal_status_send_admin = "Y";
  }
  var textlocal_status_send_client = jQuery("#ct-textlocal-sms-reminder-client-status").prop("checked");
  var sms_textlocal_status_send_client = "N";
  if (textlocal_status_send_client == true) {
    sms_textlocal_status_send_client = "Y";
  }
  var textlocal_status_send_staff = jQuery("#ct-textlocal-sms-reminder-staff-status").prop("checked");
  var sms_textlocal_status_send_staff = "N";
  if (textlocal_status_send_staff == true) {
    sms_textlocal_status_send_staff = "Y";
  }
  var sms_textlocal_username = jQuery("#mytextlocal_username").val();
  var sms_textlocal_hashid = jQuery("#mytextlocal_account_hash_id").val();
  var textlocal_admin_phone = jQuery("#ct_sms_textlocal_admin_phone").val();
  
  /*  MESSAGEBIRD STATUS */
  var messagebird_status = jQuery("#sms-noti-messagebird").prop("checked");
  var sms_messagebird_status = "N";
  if (messagebird_status == true) {
    sms_messagebird_status = "Y";
  }
  var messagebird_status_send_admin = jQuery("#ct-messagebird-sms-reminder-admin-status").prop("checked");
  var sms_messagebird_status_send_admin = "N";
  if (messagebird_status_send_admin == true) {
    sms_messagebird_status_send_admin = "Y";
  }
  var messagebird_status_send_client = jQuery("#ct-messagebird-sms-reminder-client-status").prop("checked");
  var sms_messagebird_status_send_client = "N";
  if (messagebird_status_send_client == true) {
    sms_messagebird_status_send_client = "Y";
  }
  var messagebird_status_send_staff = jQuery("#ct-messagebird-sms-reminder-staff-status").prop("checked");
  var sms_messagebird_status_send_staff = "N";
  if (messagebird_status_send_staff == true) {
    sms_messagebird_status_send_staff = "Y";
  }
  var sms_messagebird_apikey = jQuery("#messagebird_apikey").val();
  var messagebird_admin_phone = jQuery("#ct_sms_messagebird_admin_phone").val();
  jQuery("#sms_setting_form").validate({
    rules: {
      mytwilio_account_sid : {required: true},
      mytwilio_auth_token : {required: true},
      myadmin_phone_number : {required: true},
      myplivo_account_sid : {required: true},
      myplivo_auth_token : {required: true},
      myadmin_phone_number_plivo : {required: true},
      mytextlocal_username : {required : true},
      mytextlocal_account_hash_id : {required : true},
      ct_sms_textlocal_admin_phone : {required : true}
    },
    messages: {
      mytwilio_account_sid : {required: errorobj_please_enter_account_sid},
      mytwilio_auth_token : {required: errorobj_please_enter_auth_token},
      myadmin_phone_number : {required: errorobj_please_enter_admin_number},
      myplivo_account_sid : {required: errorobj_please_enter_account_sid},
      myplivo_auth_token : {required: errorobj_please_enter_auth_token},
      myadmin_phone_number_plivo : {required: errorobj_please_enter_admin_number},
      mytextlocal_username : {required : errorobj_please_enter_account_username},
      mytextlocal_account_hash_id : {required : errorobj_please_enter_account_hash_id},
      ct_sms_textlocal_admin_phone : {required : errorobj_please_enter_admin_number}
    }
  });
  jQuery(".ct-loading-main").show();
  if (!jQuery("#sms_setting_form").valid()) { jQuery(".ct-loading-main").hide(); return false; }
  var ajax_url = settingObj.ajax_url;
  var dataString = { status_sms_service: sms_service_status, account_sid: sms_twilio_account_sid, auth_token: sms_twilio_auth_token, sender_number: sms_twilio_sender_number, status_sms_to_client: send_sms_to_client_status, status_sms_to_admin: send_sms_to_admin_status, status_sms_to_staff: send_sms_to_staff_status, admin_phone: sms_twilio_admin_phone_number, account_sid_p: sms_plivo_account_sid, auth_token_p: sms_plivo_auth_token, sender_number_p: sms_plivo_sender_number, status_sms_to_client_p: send_sms_to_client_plivo_status, status_sms_to_admin_p: send_sms_to_admin_plivo_status, status_sms_to_staff_p: send_sms_to_staff_plivo_status, admin_phone_p: sms_plivo_admin_phone_number, sms_plivo_status: sms_plivo_status, sms_twilio_status: sms_twilio_status, sms_nexmo_status: sms_nexmo_status, sms_nexmo_api_key: sms_nexmo_api_key, sms_nexmo_api_secret: sms_nexmo_api_secret, sms_nexmo_from: sms_nexmo_from, sms_nexmo_statuss: sms_nexmo_statuss, sms_nexmo_statu_send_client: sms_nexmo_statu_send_client, sms_nexmo_statu_send_admin: sms_nexmo_statu_send_admin, sms_nexmo_statu_send_staff: sms_nexmo_statu_send_staff, sms_nexmo_admin_phone: sms_nexmo_admin_phone, sms_textlocal_status : sms_textlocal_status, sms_textlocal_status_send_client : sms_textlocal_status_send_client, sms_textlocal_status_send_admin : sms_textlocal_status_send_admin, sms_textlocal_status_send_staff : sms_textlocal_status_send_staff, sms_textlocal_username : sms_textlocal_username, sms_textlocal_hashid : sms_textlocal_hashid, textlocal_admin_phone : textlocal_admin_phone, sms_messagebird_status : sms_messagebird_status , sms_messagebird_status_send_admin : sms_messagebird_status_send_admin, sms_messagebird_status_send_client : sms_messagebird_status_send_client, sms_messagebird_status_send_staff : sms_messagebird_status_send_staff, sms_messagebird_apikey : sms_messagebird_apikey, messagebird_admin_phone : messagebird_admin_phone, action: "sms_reminder" };
  jQuery.ajax({
    type: "POST",
    url: ajax_url + "setting_ajax.php",
    data: dataString,
    success: function (response) {
      jQuery(".ct-loading-main").hide();
      if(jQuery.trim(response)=="updated"){
        jQuery(".mainheader_message").show();
        jQuery(".mainheader_message_inner").css("display","inline");
        jQuery("#ct_sucess_message").text(errorobj_updated_sms_settings);
        jQuery(".mainheader_message").fadeOut(3000);
      }
    }
  });
});
jQuery(document).on("click", ".payment_warning_close", function () {
  jQuery(".payment_warning").hide("fade");
});
jQuery(document).on("change", ".payment_choice", function () {
  var pay_locally = jQuery("#pay-locally").prop("checked");
  var paypal_checkout = jQuery("#paypal-checkout").prop("checked");
  var authorize_net_enable = jQuery("#authorizedotnet-payment-checkout").prop("checked");
  var stripe_enable = jQuery("#stripe-payment-checkout").prop("checked");
  var twocheckout_enable = jQuery("#twocheckout-payment-checkout").prop("checked");
  var bank_enable = jQuery("#bank-transfer-payment-checkout").prop("checked");
  var paumoney_enable = jQuery("#payu-money").prop("checked");
  var cur_button_id = jQuery(this).attr("id");
  var ext_payments = "";
  
  jQuery(".payment_choice").each(function(){
    if(jQuery(this).hasClass("ct_ext_payments_list") ==true){
      ext_payments += " "+jQuery(this).prop("checked");
    }
  });
  
  if(cur_button_id == "paypal-checkout" || cur_button_id == "pay-locally" || cur_button_id == "payu-money" || cur_button_id == "bank-transfer-payment-checkout"){} else if (jQuery(this).hasClass("ct_indirect_paymethod")){}else{
    jQuery(".payment_choice").each(function(){
      var check = jQuery(this).attr("id");
      if(check == "paypal-checkout" || check == "pay-locally" || check == "payu-money" || check == "bank-transfer-payment-checkout" || cur_button_id==check || jQuery(this).hasClass("ct_indirect_paymethod") ==true){
      }else{
        jQuery("#"+check).attr("checked",false);
        jQuery("#"+check).parent().prop("className","toggle btn btn-danger btn-sm off");
        jQuery(".mycollapse_"+check).removeAttr("style");
      }
    });
  }
  if(pay_locally!=true && paypal_checkout!=true && authorize_net_enable!=true && stripe_enable!=true && twocheckout_enable!=true &&  bank_enable!=true && paumoney_enable!=true && ext_payments.toLowerCase().indexOf("true") <= 0) {
    jQuery(".mainheader_message_fail").show();
    jQuery(".mainheader_message_inner_fail").css("display", "inline");
    jQuery("#ct_sucess_message_fail").text(errorobj_atleast_one_payment_method_should_be_enable);
    jQuery(".mainheader_message_fail").fadeOut(5000);
    jQuery(".ct-loading-main").hide();
    jQuery("#"+cur_button_id).prop("checked",true) ;
    jQuery("#"+cur_button_id).parent().prop("className","toggle btn btn-success btn-sm on");
    jQuery(".mycollapse_"+cur_button_id).toggle("blind", {direction: "vertical"}, 1000);
  }
});
/*  Below Code is use for update payment setting  */
jQuery(document).on("click", "#payment_setting", function () {
  jQuery(".ct-loading-main").show();
  var ajax_url = settingObj.ajax_url;
  var payemnt_gateway_all = "on";
  var pay_locally = jQuery("#pay-locally").prop("checked");
  var payemnt_locally = "off";
  if (pay_locally == true) {
    payemnt_locally = "on";
  }
  var paypal_checkout = jQuery("#paypal-checkout").prop("checked");
  var payemnt_paypal = "off";
  if (paypal_checkout == true) {
    payemnt_paypal = "on";
  }
  if(payemnt_paypal == "on"){
    jQuery("#payment_getway_form").validate();
    jQuery("#ct_paypal_api_username").rules("add",{
      required:true,
      messages:{required:errorobj_please_enter_api_username}
    });
    jQuery("#ct_paypal_api_password").rules("add",{
      required:true,
      messages:{required:errorobj_please_enter_api_password}
    });
    jQuery("#ct_paypal_api_signature").rules("add",{
      required:true,
      messages:{required:errorobj_please_enter_signature}
    });
  }
  var username = jQuery("#ct_paypal_api_username").val();
  var password = jQuery("#ct_paypal_api_password").val();
  var signature = jQuery("#ct_paypal_api_signature").val();
  var paypal_guest_payment = jQuery("#paypal-guest-payment").prop("checked");
  var payemnt_guest = "off";
  if (paypal_guest_payment == true) {
    payemnt_guest = "on";
  }
  var paypal_test_mode = jQuery("#paypal-test-mode").prop("checked");
  var test_mode = "off";
  if (paypal_test_mode == true) {
    test_mode = "on";
  }
  var stripe_payment_checkout = jQuery("#stripe-payment-checkout").prop("checked");
  var stripe_payment = "off";
  if (stripe_payment_checkout == true) {
    stripe_payment = "on";
  }
  if(stripe_payment=="on"){
    jQuery("#payment_getway_form").validate();
    jQuery("#ct_stripe_secretkey").rules("add",{
      required:true,
      messages:{required:errorobj_please_enter_secret_key}
    });
    jQuery("#ct_stripe_publishablekey").rules("add",{
      required:true,
      messages:{required:errorobj_please_enter_publishable_key}
    });
  }
  var secretkey = jQuery("#ct_stripe_secretkey").val();
  var publishablekey = jQuery("#ct_stripe_publishablekey").val();
  /*  Authorize.net credetnails  */
  var authorize_net_enable = jQuery("#authorizedotnet-payment-checkout").prop("checked");
  var authorize_net_status = "off";
  if (authorize_net_enable == true) {
    authorize_net_status = "on";
  }
  var autorize_login_ID = jQuery("#ct-authorizenet-API-login-ID").val();
  var authorize_transaction_key =  jQuery("#ct-authorize-transaction-key").val();
  var authorize_test_mode = "off";
  if(jQuery("#authorize-sandbox-mode").prop("checked")){
    authorize_test_mode = "on";
  }
  if(authorize_net_status=="on"){
    jQuery("#payment_getway_form").validate();
    jQuery("#ct-authorizenet-API-login-ID").rules("add",{
      required:true,
      messages:{required:errorobj_please_enter_api_login_id}
    });
    jQuery("#ct-authorize-transaction-key").rules("add",{
      required:true,
      messages:{required:errorobj_please_enter_transaction_key}
    });
  }
  /*  2 checkout payment method start */
  var twocheckout_payment_checkout = jQuery("#twocheckout-payment-checkout").prop("checked");
  var twocheckout_payment = "N";
  if (twocheckout_payment_checkout == true) {
    twocheckout_payment = "Y";
  }
  if(twocheckout_payment=="Y"){
    jQuery("#payment_getway_form").validate();
    jQuery("#ct_2checkout_privatekey").rules("add",{
      required:true,
      messages:{required:errorobj_please_enter_private_key}
    });
    jQuery("#ct_2checkout_publishkey").rules("add",{
      required:true,
      messages:{required:errorobj_please_publishable_key}
    });
    jQuery("#ct_2checkout_sellerid").rules("add",{
      required:true,
      messages:{required:errorobj_please_enter_seller_id}
    });
  }
  var twocheckout_test_mode = jQuery("#ct_2checkout_sandbox_mode").prop("checked");
  var twocheckout_testmode = "N";
  if (twocheckout_test_mode == true) {
    twocheckout_testmode = "Y";
  }
  var twocheckout_privatekey = jQuery("#ct_2checkout_privatekey").val();
  var twocheckout_sellerid = jQuery("#ct_2checkout_sellerid").val();
  var twocheckout_publishkey = jQuery("#ct_2checkout_publishkey").val();
  /*  2 checkout payment method end */
  /*bank*/
  var bank_transfer_status = jQuery("#bank-transfer-payment-checkout").prop("checked");
  var bank_status = "N";
  if (bank_transfer_status == true) {
    bank_status = "Y";
  }
  
  var bank_name = jQuery("#ct_bank_name").val();
  var account_name = jQuery("#ct_account_name").val();
  var account_number = jQuery("#ct_account_number").val();
  var branch_code = jQuery("#ct_branch_code").val();
  var ifsc_code = jQuery("#ct_ifsc_code").val();
  var bank_description = jQuery("#ct_bank_description").val();
	 
  /*end*/
  var dataString = { payemnt_gateway_all: payemnt_gateway_all, payemnt_locally: payemnt_locally, payemnt_paypal: payemnt_paypal, username: username, password: password, signature: signature, payemnt_guest: payemnt_guest, test_mode: test_mode, stripe_payment: stripe_payment, secretkey: secretkey, publishablekey: publishablekey, authorize_net_status:authorize_net_status, autorize_login_ID:autorize_login_ID, authorize_transaction_key:authorize_transaction_key, authorize_test_mode:authorize_test_mode, twocheckout_testmode:twocheckout_testmode, twocheckout_payment:twocheckout_payment, twocheckout_privatekey:twocheckout_privatekey, twocheckout_publishkey:twocheckout_publishkey, twocheckout_sellerid:twocheckout_sellerid, bank_name:bank_name, bank_status:bank_status, account_name:account_name, account_number:account_number, branch_code:branch_code, ifsc_code:ifsc_code, bank_description:bank_description, action: "payment_setting"};
  payment_save_settings_js(dataString);
  payment_validation_js();
  if(jQuery("#payment_getway_form").valid()){
    jQuery.ajax({
      type: "POST",
      url: ajax_url + "setting_ajax.php",
      data: dataString,
      success: function (response) {
        jQuery(".ct-loading-main").hide();
        if(jQuery.trim(response)=="updated"){
          jQuery(".mainheader_message").show();
          jQuery(".mainheader_message_inner").css("display","inline");
          jQuery("#ct_sucess_message").text(errorobj_updated_payments_settings);
          jQuery(".mainheader_message").fadeOut(3000);
        }
      }
    });
  }else{
    jQuery(".ct-loading-main").hide();
  }
});
/*  Below code is use for update email settings  */
jQuery(document).on("click", "#email_setting", function () {
  if (jQuery(".ct-email-settings").valid()) {
    jQuery(".ct-loading-main").show();
    var ajax_url = settingObj.ajax_url;
    var status_admin_email = jQuery("#admin-email-notification").prop("checked");
    var admin_email = "N";
    if (status_admin_email == true) {
      admin_email = "Y";
    }
    var status_staff_email = jQuery("#staff-email-notification").prop("checked");
    var staff_email = "N";
    if (status_staff_email == true) {
      staff_email = "Y";
    }
    var status_client_email = jQuery("#client-email-notification").prop("checked");
    var client_email = "N";
    if (status_client_email == true) {
      client_email = "Y";
    }
    var sender_name = jQuery("#sender_name").val();
    var sender_email = jQuery("#sender_email").val();
    var admin_optional_email = jQuery("#admin_optional_email").val();
    var appointment_reminder = jQuery("#appointment_reminder").val();
    var hostname = jQuery("#ct_smtp_hostname").val();
    var username = jQuery("#ct_smtp_username").val();
    var password = jQuery("#ct_smtp_password").val();
    var port = jQuery("#ct_smtp_port").val();
    var encryptiontype=jQuery("#encryption_val").val();
    var autheticationtype=jQuery("#authentication_val").val();
    var dataString = { admin_email: admin_email, staff_email: staff_email, client_email: client_email, sender_name: sender_name, sender_email: sender_email, admin_optional_email : admin_optional_email, appointment_reminder: appointment_reminder, hostname : hostname, username : username, password : password, encryptiontype:encryptiontype, autheticationtype:autheticationtype, port : port, action: "email_setting"
    };
    jQuery.ajax({
      type: "POST",
      url: ajax_url + "setting_ajax.php",
      data: dataString,
      success: function (response) {
        jQuery(".ct-loading-main").hide();
        if(jQuery.trim(response)=="updated"){
          jQuery(".mainheader_message").show();
          jQuery(".mainheader_message_inner").css("display","inline");
          jQuery("#ct_sucess_message").text(errorobj_updated_email_settings);
          jQuery(".mainheader_message").fadeOut(3000);
        }
      }
    });
  }
});
jQuery(document).on("change","#update_labels",function(){
  var lang = jQuery(this).val();
  if(lang!=""){
    jQuery(".show_all_labels").slideUp();
    jQuery(".ct-loading-main").show();
    jQuery(".error_labels").css("display","none");
    if(lang=="0" || lang=="none"){
      jQuery(".show_all_labels").slideUp();
      jQuery(".myall_lang_label").hide();
      jQuery(".ct-loading-main").hide();
      jQuery(".label_setting").hide();
    } else {
      jQuery.ajax({
        type: "POST",
        url: ajax_url + "setting_ajax.php",
        data: { get_all_labels : 1, oflang : lang },
        success: function (response) {
          jQuery(".myall_lang_label").html(response);
          jQuery(".myall_lang_label").show();
          jQuery(".label_setting").show();
          jQuery(".ct-loading-main").hide();
        }
      });
    }
  }
});
/* Below code is use for front tool tips */
jQuery(document).on("click", ".front_tooltips_setting", function () {
  jQuery(".ct-loading-main").show();
  var ajax_url = settingObj.ajax_url;
  var front_tooltips = jQuery("#front-tooltips").prop("checked");
  var status_front_tooltips = "off";
  if (front_tooltips == true) {
    status_front_tooltips = "on";
  }
  var tooltips_my_booking = jQuery("#ct_front_tool_tips_my_bookings").val();
  var tooltips_postal_code = jQuery("#ct_front_tool_tips_postal_code").val();
  var tooltips_service = jQuery("#ct_front_tool_tips_services").val();
  var tooltips_frequently_discount = jQuery("#ct_front_tool_tips_frequently_discount").val();
  var tooltips_time_slots = jQuery("#ct_front_tool_tips_time_slots").val();
  var tooltips_personal_details = jQuery("#ct_front_tool_tips_personal_details").val();
  var tooltips_promocode = jQuery("#ct_front_tool_tips_promocode").val();
  var tooltips_payment_method = jQuery("#ct_front_tool_payment_method").val();
  var dataString = { status_front_tooltips: status_front_tooltips, tooltips_my_booking: tooltips_my_booking, tooltips_postal_code: tooltips_postal_code, tooltips_service: tooltips_service,tooltips_frequently_discount : tooltips_frequently_discount, tooltips_time_slots: tooltips_time_slots, tooltips_personal_details : tooltips_personal_details, tooltips_promocode : tooltips_promocode, tooltips_payment_method : tooltips_payment_method, action: "front_tooltips_setting"
  };
  jQuery.ajax({
    type: "POST",
    url: ajax_url + "setting_ajax.php",
    data: dataString,
    success: function (response) {
      jQuery(".ct-loading-main").hide();
      if(jQuery.trim(response)=="updated"){
        jQuery(".mainheader_message").show();
        jQuery(".mainheader_message_inner").css("display","inline");
        jQuery("#ct_sucess_message").text(errorobj_updated_email_settings);
        jQuery(".mainheader_message").fadeOut(3000);
      }
    }
  });
});

jQuery(document).on("ajaxComplete click",".ct-edit-specoff",function(){
  var special_off_id = jQuery(this).attr("data-id");
  jQuery(".update-specoff-new").each(function () {
    jQuery(this).hide();
  });
  jQuery(".update-promocode-new").css("display", "none");
  jQuery(".ct-update-specoff-li").addClass("active");
  jQuery(".special-offer-list").removeClass("active");
  jQuery(".ct-update-specoff-li").show();
  jQuery("#update-special-offer-form" + special_off_id).show();
});
jQuery(document).on("click", ".special-offer-list", function () {
  jQuery(".ct-update-specoff-li").hide();
});
/*  Below code is use for adding promo code promocode settings */
/* Edit Coupon */
jQuery(document).on("ajaxComplete click",".ct-edit-coupon",function(){
  var promocodeid = jQuery(this).attr("data-id");
  jQuery(".update-promocode-new").each(function () {
    jQuery(this).hide();
  });
  jQuery(".ct-update-promocode-li").addClass("active");
  jQuery(".promocode-list-li").removeClass("active");
  jQuery(".ct-update-promocode-li").show();
  jQuery("#update-promocode-form" + promocodeid).show();
});
jQuery(document).on("click", ".promocode-list-li", function () {
  jQuery(".ct-update-promocode-li").hide();
});
/* ADD PROMOCODE */
jQuery(document).on("click", "#promo_code", function () {
  jQuery(".ct-loading-main").show();
  var coupon_code = jQuery("#coupon_code").val();
  var coupon_type = jQuery("#coupon_type").val();
  var value = jQuery("#coupon_value").val();
  var limit = jQuery("#coupon_limit").val();
  var expiry_date = jQuery("#expiry_date").val();
  jQuery("#form_promo_code").validate({
    rules: {
      coupon_code: {required: true},
      coupon_limit: {required: true, pattern_cp: true},
      coupon_value: {required: true, pattern_cp: true},
      coupon_expiry_date: {required: true},
    }, messages: {
      coupon_code: {required: "Please enter coupon code"},
      coupon_limit: {required: errorobj_please_enter_coupon_limit, pattern_cp: errorobj_please_enter_only_numerics},
      coupon_value: {required: errorobj_please_enter_coupon_value, pattern_cp: errorobj_please_enter_only_numerics},
      coupon_expiry_date: {required: errorobj_please_select_expiry_date},
    }
  });
  if (!jQuery("#form_promo_code").valid()) { jQuery(".ct-loading-main").hide(); return false; }
  jQuery(".ct-loading-main").show();
  var datastring = { coupon_code: coupon_code, coupon_type: coupon_type, value: value, limit: limit, expiry_date: expiry_date, action: "add_promo_code" };
  jQuery.ajax({
    type: "POST",
    url: ajax_url + "promo_code_ajax.php",
    data: datastring,
    success: function (response) {
      if(parseInt(response) == 1){
        jQuery(".mainheader_message_fail").show();
        jQuery(".mainheader_message_inner_fail").css("display", "inline");
        jQuery("#ct_sucess_message_fail").text(errorobj_sorry_promocode_already_exist);
        jQuery(".mainheader_message_fail").fadeOut(3000);
        jQuery(".ct-loading-main").hide();
      } else {
        jQuery(".ct-loading-main").hide();
        location.reload();
      }
    }
  });
});
/* DELETE SPECIAL OFFER */
jQuery(document).on("click", ".mybtndeletespecoff", function () {
  var recordid = jQuery(this).attr("data-id");
  jQuery(".ct-loading-main").show();
  var datastring = {recordid: recordid, action: "delete_specoff_record"};
  jQuery.ajax({
    type: "POST",
    url: ajax_url + "promo_code_ajax.php",
    data: datastring,
    success: function (response) {
      jQuery("#couponspecdata_row" + recordid).fadeOut();
      jQuery(".ct-loading-main").hide();
    }
  });
});
/* UPDATE SPECIAL OFFER */
jQuery(document).on("click", ".mybtnupdatespecialoffcode", function () {
  var id = jQuery(this).attr("data-id");
  var edit_special_text = jQuery("#edit_special_text" + id).val();
  var edit_offer_type = jQuery("#edit_offer_type" + id).val();
  var edit_special_value = jQuery("#edit_special_value" + id).val();
  var edit_special_date = jQuery("#edit_special_date" + id).val();
  
  jQuery("#update_special_formss" + id).validate();
  jQuery("#edit_special_value" + id).rules("add",{
    required: true,
    messages: {required: "Please enter special offer value"}
  });
  jQuery("#edit_special_text" + id).rules("add",{
    required: true,
    messages: {required: "Please enter speciasl offer text"}
  });
  
  if (!jQuery("#update_special_formss" + id).valid()) {return false;}
  jQuery(".ct-loading-main").show();
  var datastring = { recordid: id, edit_special_text: edit_special_text, edit_offer_type: edit_offer_type, edit_special_value: edit_special_value, edit_special_date: edit_special_date, action: "edit_special_offer" };
  jQuery.ajax({
    type: "POST",
    url: ajax_url + "promo_code_ajax.php",
    data: datastring,
    success: function (response) {
      jQuery(".ct-loading-main").hide();
      location.reload();
    }
  });
});
/* DELETE PROMOCODE */
jQuery(document).on("click", ".mybtndeletepromocode", function () {
  var recordid = jQuery(this).attr("data-id");
  jQuery(".ct-loading-main").show();
  var datastring = {recordid: recordid, action: "delete_record"};
  jQuery.ajax({
    type: "POST",
    url: ajax_url + "promo_code_ajax.php",
    data: datastring,
    success: function (response) {
      jQuery("#coupondata_row" + recordid).fadeOut();
      jQuery(".ct-loading-main").hide();
    }
  });
});
/* UPDATE PROMOCODE CODE */
jQuery(document).on("click", ".mybtnupdatepromocode", function () {
  var id = jQuery(this).attr("data-id");
  var edit_coupon_code = jQuery("#edit_coupon_code" + id).val();
  var edit_coupon_type = jQuery("#edit_coupon_type" + id).val();
  var edit_value = jQuery("#edit_value" + id).val();
  var edit_limit = jQuery("#edit_limit" + id).val();
  var edit_expiry_date = jQuery("#edit_expiry_date" + id).val();
  jQuery("#update_promo_formss" + id).validate();
  jQuery("#edit_value" + id).rules("add",{
    required: true, 
    messages: {required: errorobj_please_enter_coupon_value}
  });
  jQuery("#edit_coupon_code" + id).rules("add",{
    required: true,
    messages: {required: errorobj_please_enter_coupon_code}
  });
  jQuery("#edit_limit" + id).rules("add",{
    required: true,
    messages: {required: errorobj_please_enter_coupon_limit}
  });
  if (!jQuery("#update_promo_formss" + id).valid()) {return false;}
  jQuery(".ct-loading-main").show();
  var datastring = { recordid: id, edit_coupon_code: edit_coupon_code, edit_coupon_type: edit_coupon_type, edit_value: edit_value, edit_limit: edit_limit, edit_expiry_date: edit_expiry_date, action: "edit_promo_code" };
  jQuery.ajax({
    type: "POST",
    url: ajax_url + "promo_code_ajax.php",
    data: datastring,
    success: function (response) {
      jQuery(".ct-loading-main").hide();
      location.reload();
    }
  });
});
/* LOAD ALL ADDONS */
jQuery(document).on("click", ".service_addons", function () {
  var id = jQuery(this).attr("id");
  var table = jQuery("#table-service-addons").DataTable();
  var dataString = { id: id, action: "display_ser_addons" }
  jQuery(".ct-loading-main").show();
  jQuery.ajax({
    type: "POST",
    url: ajax_url + "export_ajax.php",
    data: dataString,
    success: function (response) {
      table.destroy();
      jQuery(".ct-loading-main").hide();
      jQuery("#display_addons").html(response);
    }
  });
});

/* LOAD ALL METHODS */
jQuery(document).on("click", ".service_methods", function () {
  var id = jQuery(this).attr("id");
  var table = jQuery("#table-service-method").DataTable();
  var dataString = { id: id, action: "display_ser_method" }
  jQuery(".ct-loading-main").show();
  jQuery.ajax({
    type: "POST",
    url: ajax_url + "export_ajax.php",
    data: dataString,
    success: function (response) {
      table.destroy();
      jQuery(".ct-loading-main").hide();
      jQuery("#display_method").html(response);
    }
  });
});
/* LOAD BOOKING ADDONS */
jQuery(document).on("click", ".booking_addons", function () {
  var id = jQuery(this).attr("id");
  var table = jQuery("#table-booking-addons").DataTable();
  var dataString = { id: id, action: "display_booking_addons" }
  jQuery(".ct-loading-main").show();
  jQuery.ajax({
    type: "POST",
    url: ajax_url + "export_ajax.php",
    data: dataString,
    success: function (response) {
      table.destroy();
      jQuery(".ct-loading-main").hide();
      jQuery("#display_booking_addons").html(response);
    }
  });
});
/* LOAD BOOKING METHODS */
jQuery(document).on("click", ".booking_methods", function () {
  var id = jQuery(this).attr("id");
  var table = jQuery("#table-booking-method").DataTable();
  var dataString = { id : id, action: "display_booking_method" }
  jQuery(".ct-loading-main").show();
  jQuery.ajax({
    type: "POST",
    url: ajax_url + "export_ajax.php",
    data: dataString,
    success: function (response) {
      table.destroy();
      jQuery(".ct-loading-main").hide();
      jQuery("#display_booking_method").html(response);
    }
  });
});
/* off day */
jQuery(document).on("click", ".offsingledate", function () {
  jQuery(".ct-loading-main").show();
  var date_id = jQuery(this).attr("id");
  var prov_id = jQuery(this).attr("data-prov_id");
  if (jQuery(this).hasClass("highlight")) {
    jQuery(this).removeClass("highlight");
  } else {
    jQuery(this).addClass("highlight");
  }
  var dataString = { date_id: date_id, prov_id: prov_id, status: "off_day" };
  jQuery.ajax({
    type: "POST",
    url: ajax_url + "weekday_ajax.php",
    data: dataString,
    success: function (res) {
      jQuery(".ct-loading-main").hide();
      jQuery(".mainheader_message").show();
      jQuery(".mainheader_message").css("display", "block");
      jQuery("#ct_sucess_message").text(res);
      jQuery(".mainheader_message").fadeOut(3000);
    }
  });
});
/* Below code is use for add and delete month off days */
jQuery(document).on("click", ".all", function () {
  jQuery(".ct-loading-main").show();
  var checkmonthdate = jQuery(this).prop("checked");
  var monthcheck = "off";
  if (checkmonthdate == true) {
    monthcheck = "on";
  }
  if (monthcheck == "on") {
    var date_id = jQuery(this).attr("id");
    var provider_id = jQuery(this).attr("data-prov_id");
    var m = jQuery(this).attr("id");
    if (jQuery(this).hasClass("highlight")) {
      jQuery(this).removeClass("highlight");
    } else {
      jQuery(this).addClass("highlight");
    }
    var dataString = { date_id: date_id, provider_id: provider_id, status: "month_off_day" };
    jQuery.ajax({
      type: "POST",
      url: ajax_url + "weekday_ajax.php",
      data: dataString,
      success: function (response) {
        jQuery(".ct-loading-main").hide();
      }
    });
  } else {
    jQuery(".ct-loading-main").show();
    var date_id = jQuery(this).attr("id");
    var provider_id = jQuery(this).attr("data-prov_id");
    var m = jQuery(this).attr("id");
    if (jQuery(this).hasClass("highlight")) {
      jQuery(this).removeClass("highlight");
    } else {
      jQuery(this).addClass("highlight");
    }
    var dataString = { date_id: date_id, provider_id: provider_id, status: "delete_month_off_day" };
    jQuery.ajax({
      type: "POST",
      url: ajax_url + "weekday_ajax.php",
      data: dataString,
      success: function (response) {
        jQuery(".ct-loading-main").hide();
      }
    });
  }
  var yearmonthid = jQuery(this).attr("id");
  var spyear = yearmonthid.split("-");
  var syear = spyear[0];
  var smonth = spyear[1];
  if (jQuery(this).is(":checked")) {
    jQuery(".offsingledate").each(function () {
      var whole = jQuery(this).attr("id");
      var sp = whole.split("-");
      if (syear == sp[0] && smonth == sp[1]) {
        jQuery(this).addClass("highlight");
      }
    });
  } else {
    jQuery(".offsingledate").each(function () {
      var whole = jQuery(this).attr("id");
      var sp = whole.split("-");
      if (syear == sp[0] && smonth == sp[1]) {
        jQuery(this).removeClass("highlight");
      }
    });
  }
});
jQuery(document).on("click", ".myregistercust_bookings", function () {
  var id = jQuery(this).attr("data-id");
  var table = jQuery("#registered-client-booking-details_new").DataTable();
  var dataString = { id: id, getclient_bookings_details: 1 };
  jQuery.ajax({
    type: "POST",
    url: ajax_url + "customer_admin_ajax.php",
    data: dataString,
    success: function (res) {
      table.destroy();
      jQuery("#details_booking_display").html(res);
    }
  });
});
jQuery(document).on("click", ".myguestcust_bookings", function () {
    var id = jQuery(this).attr("data-id");
    var email = jQuery(this).attr("data-email");
    var table = jQuery("#guest-client-booking-details_new").DataTable();
    var dataString = {
        orderid: id,
        guest: 1,
        email: email
    };
    jQuery.ajax({
        type: "POST",
        url: ajax_url + "customer_admin_ajax.php",
        data: dataString,
        success: function (res) {
            table.destroy();
            jQuery("#details_booking_display_guest").html(res);
        }
    });
});
/* DELETE THE BOOKINGS OF THE GUEST CUSTOMERS FROM CUSTOMER PAGE */
jQuery(document).on("click", ".mybtndelete_guest_customers_entry", function () {
  jQuery(".ct-loading-main").show();
  var orderid = jQuery(this).attr("data-id");
  jQuery.ajax({
    type: "post",
    data: { delete_guest_bookings: 1, orderid: orderid },
    url: ajax_url + "customer_admin_ajax.php",
    success: function (res) {
      jQuery("#myguest_" + orderid).remove();
      jQuery(".ct-loading-main").hide();
    }
  });
});
/* LOGOUT CODE */
jQuery(document).on("click", "#logout", function () {
  var site_url=site_ur.site_url;
  var user = jQuery(this).attr("data-id");
  jQuery.ajax({
    type: "post",
    data: { logout: 1 },
    url: ajax_url + "admin_login_ajax.php",
    success: function (res) {
      if(user=="user"){
        window.location=site_url;
      } else{
        location.reload();
      }
    }
  });
});
/* Setting Image Upload */
jQuery(document).on("click", ".ct_upload_img3", function (e) {
  jQuery(".ct-loading-main").show();
  var imageuss = jQuery(this).attr("data-us");
  var imageids = jQuery(this).attr("data-imageinputid");
  var file_data = jQuery("#" + jQuery(this).attr("data-imageinputid")).prop("files")[0];
  var img_site_url = servObj.site_url;
  var imgObj_url = imgObj.img_url;
  var formdata = new FormData();
  var ctus = jQuery(this).attr("data-us");
  var img_w = jQuery("#" + ctus + "w").val();
  var img_h = jQuery("#" + ctus + "h").val();
  var img_x1 = jQuery("#" + ctus + "x1").val();
  var img_x2 = jQuery("#" + ctus + "x2").val();
  var img_y1 = jQuery("#" + ctus + "y1").val();
  var img_y2 = jQuery("#" + ctus + "y2").val();
  var img_name = jQuery("#" + ctus + "newname").val();
  var img_id = jQuery("#" + ctus + "id").val();
  formdata.append("image", file_data);
  formdata.append("w", img_w);
  formdata.append("h", img_h);
  formdata.append("x1", img_x1);
  formdata.append("x2", img_x2);
  formdata.append("y1", img_y1);
  formdata.append("y2", img_y2);
  formdata.append("newname", img_name);
  formdata.append("img_id", img_id);
  formdata.append("check_for_logo_img", imageids);
  jQuery.ajax({
    url: ajax_url + "upload.php",
    type: "POST",
    data: formdata,
    cache: false,
    contentType: false,
    processData: false,
    success: function (data) {
      jQuery(".ct-loading-main").hide();
      jQuery("#" + ctus + "ctimagename").val(data);
      jQuery(".hidemodal").trigger("click");
      jQuery("#" + ctus + "salonlogo").attr("src", imgObj_url + "services/" + data);
      jQuery(".error_image").hide();
      jQuery("#"+imageids).val("");
    }
  });
});
/* Change profile admin */
jQuery(document).on("click", ".mybtnadminprofile_save", function () {
  jQuery(".ct-loading-main").show();
  var adminid = jQuery(this).attr("data-id");
  var oldpass = jQuery("#oldpass").val();
  var dboldpass = jQuery("#dboldpass").val();
  var newpass = jQuery("#newpass").val();
  var old_email = jQuery("#inputEmailold").val();
  var new_email = jQuery("#inputEmail").val();
  jQuery("#admin_info_form").validate();
  jQuery("#adminfullname").rules("add",{
    required: true,
    messages: {required: errorobj_please_enter_fullname}
  });
  if(new_email!=old_email){    
    jQuery(".admin_inputEmail").rules("add",{
      required: true, email:true, remote: { url:ajax_url+"staff_ajax.php", type: "POST" },
      messages: {required: errorobj_please_enter_email, email:errorobj_please_enter_valid_email_address, remote:errorobj_email_already_exists }
    });
  }
  jQuery("#adminzip").rules("add",{
    minlength : 3,maxlength : 7,
    messages: {minlength: errorobj_please_enter_minimum_3_chars,maxlength: errorobj_please_enter_only_7_chars_maximum}
  });
  jQuery("#adminphone").rules("add",{
    pattern_phone: true, minlength: 12, maxlength: 15,
    messages: { pattern_phone : errorobj_please_enter_valid_number_with_country_code, minlength: errorobj_please_enter_valid_number, maxlength: errorobj_please_enter_valid_number }
  });
  if (jQuery(".ct-change-password").is(":visible")) {
    jQuery("#oldpass").rules("add",{
      required: true, user_profile_pattern_password: true,
      messages: {required: errorobj_please_enter_old_password,minlength: errorobj_password_must_be_8_character_long}
    });
    jQuery("#newpass").rules("add",{
      required: true, user_profile_pattern_password: true,minlength: 8, maxlength: 20,
      messages: {required: errorobj_please_enter_new_password,minlength: errorobj_password_must_be_8_character_long,maxlength : errorobj_password_should_not_exist_more_then_20_characters}
    });
    jQuery("#retypenewpass").rules("add",{
      required: true, user_profile_pattern_password: true,minlength: 8, maxlength: 20,
      messages: {required: errorobj_please_enter_confirm_password,minlength: errorobj_password_must_be_8_character_long,maxlength : errorobj_password_should_not_exist_more_then_20_characters}
    });
  }
  if (!jQuery("#admin_info_form").valid()) { jQuery(".ct-loading-main").hide(); return false; }
  jQuery.ajax({
    type: "post",
    data: { "fullname": jQuery("#adminfullname").val(), "adminemail": jQuery("#inputEmail").val(), "phone": jQuery("#adminphone").val(), "address": jQuery("#adminaddress").val(), "city": jQuery("#admincity").val(), "state": jQuery("#adminstate").val(), "zip": jQuery("#adminzip").val(), "country": jQuery("#admincountry").val(), "dboldpassword" : jQuery("#dboldpass").val(), "oldpassword" : jQuery("#oldpass").val(), "newpassword" : jQuery("#newpass").val(), "retypepassword" : jQuery("#retypenewpass").val(), "id": adminid, "updatepass": 1 },
    url: ajax_url + "admin_profile_ajax.php",
    success: function (res) {
      jQuery(".ct-loading-main").hide();
      if(jQuery.trim(res) == "sorry"){
        jQuery(".old_pass_msg").css("display","block");
        jQuery(".old_pass_msg").addClass("error");
        jQuery(".old_pass_msg").html(errorobj_your_old_password_incorrect);
      } else if (jQuery.trim(res) == "Please Retype Correct Password..."){
        jQuery(".retype_pass_msg").css("display","block");
        jQuery(".retype_pass_msg").addClass("error");
        jQuery(".retype_pass_msg").html(errorobj_please_retype_correct_password);
      } else {
        location.reload();
      }
    }
  });
});
/* Remove new passowrd and retype new password error after correct */
jQuery(document).on("click",".u_rp",function(){
  jQuery(".retype_pass_msg").hide();
});
/* Remove old password error after correct */
jQuery(document).on("click",".u_op",function(){
  jQuery(".old_pass_msg").hide();
});
/* Change profile USER */
jQuery(document).on("click", ".mybtnuserprofile_save", function () {
  var userid = jQuery(this).attr("data-id");
  var oldpass = jQuery("#oldpass").val();
  var dboldpass = jQuery("#dboldpass").val();
  var zip_status_check = jQuery(this).attr("data-zip");
  jQuery("#user_info_form").validate();
  jQuery("#userfirstname").rules("add",{
    required: true,
    messages: {required: errorobj_please_enter_firstname}
  });
  if (jQuery(".ct-change-password").is(":visible")) {
    jQuery("#useroldpass").rules("add",{
      required: true, user_profile_pattern_password: true,minlength: 8,
      messages: {required: errorobj_please_enter_old_password,minlength: errorobj_password_must_be_8_character_long}
    });
    jQuery("#usernewpasswrd").rules("add",{
      required: true, user_profile_pattern_password: true,minlength: 8, maxlength: 20,
      messages: {required: errorobj_please_enter_new_password,minlength: errorobj_password_must_be_8_character_long,maxlength : errorobj_password_should_not_exist_more_then_20_characters}
    });
    jQuery("#userrenewpasswrd").rules("add",{
      required: true, user_profile_pattern_password: true,minlength: 8, maxlength: 20,
      messages: {required: errorobj_please_enter_confirm_password,minlength: errorobj_password_must_be_8_character_long,maxlength : errorobj_password_should_not_exist_more_then_20_characters}
    });
  }
  jQuery("#userlastname").rules("add",{
    required: true,
    messages: {required: errorobj_please_enter_lastname}
  });
  jQuery("#usercity").rules("add",{
    required: true, 
    messages: {required: errorobj_please_enter_city}
  });
  jQuery("#userstate").rules("add",{
    required: true, 
    messages: {required: errorobj_please_enter_state}
  });
  if(zip_status_check == "Y"){
    jQuery("#userzip").rules("add",{
      required: true, minlength: 3, maxlength: 7,
      messages: {required: errorobj_please_enter_zipcode,minlength: errorobj_please_enter_minimum_3_chars,maxlength: errorobj_please_enter_only_7_chars_maximum}
    });
  }
  jQuery("#userphone").rules("add",{
    required: true, pattern_phone: true, minlength: 12, maxlength: 15,
    messages: { required: errorobj_please_enter_phone_number, pattern_phone : errorobj_please_enter_valid_number_with_country_code, minlength: errorobj_please_enter_valid_number, maxlength: errorobj_please_enter_valid_number }
  });
  if (!jQuery("#user_info_form").valid()) { return false; }
  if(zip_status_check == "Y"){
    var datastring={"firstname": jQuery("#userfirstname").val(),"lastname": jQuery("#userlastname").val(),"phone": jQuery("#userphone").val(),"address": jQuery("#useraddress").val(),  "city": jQuery("#usercity").val(),"state": jQuery("#userstate").val(),"zip": jQuery("#userzip").val(),"dboldpassword" : jQuery("#userdboldpass").val(),"oldpassword" : jQuery("#useroldpass").val(), "newpassword" : jQuery("#usernewpasswrd").val(),"retypepassword" : jQuery("#userrenewpasswrd").val(),"id": userid,"updatepass": 1};  
  } else {
    var datastring={"firstname": jQuery("#userfirstname").val(),"lastname": jQuery("#userlastname").val(),"phone": jQuery("#userphone").val(),"address": jQuery("#useraddress").val(),  "city": jQuery("#usercity").val(),"state": jQuery("#userstate").val(),"dboldpassword" : jQuery("#userdboldpass").val(),"oldpassword" : jQuery("#useroldpass").val(), "newpassword" : jQuery("#usernewpasswrd").val(),"retypepassword" : jQuery("#userrenewpasswrd").val(),"id": userid,"updatepass": 1};
  }
  jQuery.ajax({
    type: "post",
    data: datastring,
    url: ajax_url + "user_details_ajax.php",
    success: function (res) {
      if(jQuery.trim(res) == "Your Old Password Incorrect..."){
        jQuery(".old_pass_msg").css("display","block");
        jQuery(".old_pass_msg").addClass("error");
        jQuery(".old_pass_msg").html(errorobj_your_old_password_incorrect+"...");
      } else if(jQuery.trim(res) == "Please Retype Correct Password..."){
        jQuery(".retype_pass_msg").css("display","block");
        jQuery(".retype_pass_msg").addClass("error");
        jQuery(".retype_pass_msg").html(errorobj_please_retype_correct_password+"...");
      } else{
        jQuery(".mainheader_message").show();
        jQuery(".mainheader_message_inner").css("display","inline");
        jQuery("#ct_sucess_message").html(errorobj_profile_updated_successfully);
        jQuery(".mainheader_message").fadeOut(3000);
        location.reload();
      }
    }
  });
});
jQuery(document).on("click", ".delete_image", function () {
  var service_id = jQuery(this).attr("data-service_id");
  var dataString = {service_id: service_id, action: "delete_image"};
  var imgObj_url = imgObj.img_url;
  jQuery.ajax({
    type: "POST",
    url: ajax_url + "service_ajax.php",
    data: dataString,
    success: function (response) {
      jQuery("#pcls" + service_id + "serviceimage").attr("src", imgObj_url + "services/default.png");
      jQuery(".ser_cam_btn" + service_id).addClass("show");
      jQuery(".ser_new_del" + service_id).removeClass("show");
      jQuery(".ser_new_del" + service_id).hide();
      jQuery(".del_btn_popup" + service_id).removeClass("show");
      jQuery("#pcls" + service_id + "ctimagename").val("");
      jQuery("#ct-remove-service-imagepcls" + service_id).trigger("click");
    }
  });
});
jQuery(document).on("click", ".delete_image", function () {
   var service_id = jQuery(this).attr("data-service_id");
  var dataString = {service_id: service_id, action: "delete_image"};
  var imgObj_url = imgObj.img_url;
  jQuery.ajax({
    type: "POST",
    url: ajax_url + "service_ajax.php",
    data: dataString,
    success: function (response) {
      jQuery("#pcls" + service_id + "serviceimage").attr("src", imgObj_url + "services/default.png");
      jQuery(".ser_cam_btn" + service_id).addClass("show");
      jQuery(".ser_new_del" + service_id).removeClass("show");
      jQuery(".ser_new_del" + service_id).hide();
      jQuery(".del_btn_popup" + service_id).removeClass("show");
      jQuery(".del_btn_popup" + service_id).hide();
      jQuery("#pcls" + service_id + "ctimagename").val("");
      jQuery("#ct-close-popover-service-image").trigger("click");
    }
  });
});
jQuery(document).on("click", ".delete_image_addons", function () {
  var serviceaddons_id = jQuery(this).attr("data-pcaolid");
  var dataString = {serviceaddons_id: serviceaddons_id, action: "delete_image_addons"};
  var imgObj_url = imgObj.img_url;
  jQuery.ajax({
    type: "POST",
    url: ajax_url + "service_addons_ajax.php",
    data: dataString,
    success: function (response) {
      jQuery("#pcaol" + serviceaddons_id + "addonimage").attr("src", imgObj_url + "services/default.png");
      jQuery(".cam_btn_addon" + serviceaddons_id).addClass("show");
      jQuery(".addons_del_icon" + serviceaddons_id).removeClass("show");
      jQuery(".addons_del_icon" + serviceaddons_id).hide();
      jQuery(".del_btn_addon" + serviceaddons_id).removeClass("show");
      jQuery("#pcaol" + serviceaddons_id + "ctimagename").val("");
      jQuery("#ct-close-popover-service-image").trigger("click");
    }
  });
});
jQuery(document).on("click", ".delete_com_logo", function () {
  var optionname = jQuery(this).attr("data-comp_id");
  var imgObj_url = imgObj.img_url;
  var dataString = {optionname: optionname, action: "delete_logo"};
  jQuery.ajax({
    type: "POST",
    url: ajax_url + "setting_ajax.php",
    data: dataString,
    success: function (response) {
      jQuery("#ctsisalonlogo").attr("src", imgObj_url + "/company-logo.png");
      jQuery(".del_btn").hide();
      jQuery(".del_btn").removeClass("show");
      jQuery("#ct-remove-company-logo-new").hide();
      jQuery("#ct-remove-company-logo-new").removeClass("show");
      jQuery(".set_newcam_icon").addClass("show");
      jQuery("#ctsictimagename").val("");
      jQuery("#ct-close-popover-salon-logoctsi").trigger("click");
    }
  });
});
/*  Service Toggle  */
jQuery(document).on("change", ".ct-show-hide-checkbox", function () {
  var toggle_id = jQuery(this).attr("id");
  /*  uncheck other checkbox  */
  jQuery(".ct-show-hide-checkbox").each(function () {
    if (jQuery(this).attr("id") != toggle_id) {
      jQuery(this).removeAttr("checked");
    }
  });
  /*  Hide service details expect current  */
  jQuery(".service_detail").each(function () {
    if (jQuery(this).attr("id") != toggle_id) {
      jQuery(this).hide("blind", {direction: "vertical"}, 500);
    }
  });
  /*  Show current details and hide other ones  */
  if (jQuery(this).is(":checked")) {
    jQuery("#detail_" + toggle_id).show("blind", {direction: "vertical"}, 1000);
  } else {
    jQuery("#detail_" + toggle_id).hide("blind", {direction: "vertical"}, 500);
  }
});
/*  Addon"s Toggle  */
jQuery(document).on("change", ".ct-show-hide-checkbox", function () {
  var toggles_id = jQuery(this).attr("id");
  /*  uncheck other checkbox  */
  jQuery(".ct-show-hide-checkbox").each(function () {
    if (jQuery(this).attr("id") != toggles_id) {
      jQuery(this).removeAttr("checked");
    }
  });
  /*  Hide service details expect current  */
  jQuery(".serviceaddon_detail").each(function () {
    if (jQuery(this).attr("id") != toggles_id) {
      jQuery(this).hide("blind", {direction: "vertical"}, 500);
    }
  });
  /*  Show current details and hide other ones  */
  if (jQuery(this).is(":checked")) {
    jQuery("#details_" + toggles_id).show("blind", {direction: "vertical"}, 1000);
  } else {
    jQuery("#details_" + toggles_id).hide("blind", {direction: "vertical"}, 500);
  }
});
/*  Method"s Toggle  */
jQuery(document).on("change", ".ct-show-hide-checkbox", function () {
  var toggles_id = jQuery(this).attr("id");
  /*  uncheck other checkbox  */
  jQuery(".ct-show-hide-checkbox").each(function () {
    if (jQuery(this).attr("id") != toggles_id) {
      jQuery(this).removeAttr("checked");
    }
  });
  /*  Hide service details expect current  */
  jQuery(".servicemeth_details").each(function () {
    if (jQuery(this).attr("id") != toggles_id) {
      jQuery(this).hide("blind", {direction: "vertical"}, 500);
    }
  });
  /*  Show current details and hide other ones  */
  if (jQuery(this).is(":checked")) {
    jQuery("#detailmes_" + toggles_id).show("blind", {direction: "vertical"}, 1000);
  } else {
    jQuery("#detailmes_" + toggles_id).hide("blind", {direction: "vertical"}, 500);
  }
});
/*  Language Toggle  */
jQuery(document).on("change", ".ct-show-hide-checkbox", function () {
  var toggles_id = jQuery(this).attr("id");
  /*  Hide service details expect current  */
  jQuery(".language_detail").each(function () {
    if (jQuery(this).attr("id") != "detail_"+toggles_id) {
      jQuery(this).hide("blind", {direction: "vertical"}, 500);
    }
  });
/*  uncheck other checkbox  */
  jQuery(".ct-show-hide-checkbox").each(function () {
    if (jQuery(this).attr("id") != toggles_id) {
      jQuery(this).removeAttr("checked");
    }
  });
  /*  Show current details and hide other ones  */
  if (jQuery(this).is(":checked")) {
    jQuery("#detail_" + toggles_id).show("blind", {direction: "vertical"}, 1000);
  } else {
    jQuery("#detail_" + toggles_id).hide("blind", {direction: "vertical"}, 500);
  }
});
jQuery(document).on("change",".endtimenew",function(){
  var endid=jQuery(this).attr("id");
  var wdid=jQuery(this).attr("data-aid");
  var endval=jQuery(this).val();
  var startval=jQuery("#starttimenews_"+wdid).val();
  if(endval<startval){
    jQuery(".mainheader_message_fail").show();
    jQuery(".mainheader_message_inner_fail").css("display","inline");
    jQuery("#ct_sucess_message_fail").html(errorobj_please_select_end_time_greater_than_start_time);
    jQuery(".mainheader_message_fail").fadeOut(5000);
  }
});
jQuery(document).on("change",".starttimenew",function(){
  var endid=jQuery(this).attr("id");
  var wdid=jQuery(this).attr("data-aid");
  var startval=jQuery("#starttimenew_"+wdid).val();
  var endval=jQuery("#endtimenews_"+wdid).val();
  if(endval>startval){
    jQuery(".mainheader_message_fail").show();
    jQuery(".mainheader_message_inner_fail").css("display","inline");
    jQuery("#ct_sucess_message_fail").html(errorobj_please_select_end_time_less_than_start_time);
    jQuery(".mainheader_message_fail").fadeOut(5000);
  }
});
/* FREQUENTLY DISCOUNT SETTINGS */
/* UPDATE STATUS */
jQuery(document).on("change", ".myfrequentlydiscount_status", function () {
    if (jQuery(this).prop("checked") == true) {
      var id = jQuery(this).attr("data-id");
      jQuery(".ct-loading-main").show();
      jQuery.ajax({
        type: "post",
        data: { id: id, changestatus: "E", freqdis : 1 },
        url: ajax_url + "setting_ajax.php",
        success: function (res) {
          jQuery(".ct-loading-main").hide();
          jQuery(".ct-loading-main").hide();
          jQuery(".mainheader_message_inner").css("display","inline");
          jQuery("#ct_sucess_message").html(errorobj_frequently_discount_status_updated);
          jQuery(".mainheader_message").show();
          jQuery(".mainheader_message").fadeOut(5000);
        }
      });
    } else {
      var id = jQuery(this).attr("data-id");
      jQuery(".ct-loading-main").show();
      jQuery.ajax({
        type: "post",
        data: { id: id, changestatus: "D", freqdis : 1 },
        url: ajax_url + "setting_ajax.php",
        success: function (res) {
          jQuery(".ct-loading-main").hide();
          jQuery(".ct-loading-main").hide();
          jQuery(".mainheader_message_inner").css("display","inline");
          jQuery("#ct_sucess_message").html(errorobj_frequently_discount_status_updated);
          jQuery(".mainheader_message").show();
          jQuery(".mainheader_message").fadeOut(5000);
        }
      });
    }
});
/* frequtently toggle close */
jQuery(document).on("change", ".ct-show-hide-checkbox", function () {
  var toggle_id = jQuery(this).attr("id");
  /*  uncheck other checkbox  */
  jQuery(".ct-show-hide-checkbox").each(function () {
    if (jQuery(this).attr("id") != toggle_id) {
      jQuery(this).removeAttr("checked");
    }
  });
  /*  Hide service details expect current  */
  jQuery(".fdd_details").each(function () {
    if (jQuery(this).attr("id") != toggle_id) {
      jQuery(this).hide("blind", {direction: "vertical"}, 500);
    }
  });
  /*  Show current details and hide other ones  */
  if (jQuery(this).is(":checked")) {
    jQuery("#detail" + toggle_id).show("blind", {direction: "vertical"}, 1000);
  } else {
    jQuery("#detail" + toggle_id).hide("blind", {direction: "vertical"}, 500);
  }
});
/* FREQUENTLY DISCOUNT SETTINGS END */
/* DELETE THE ORDER FROM BOOKINGS */
jQuery(document).on("click",".mybtncancel_booking_user_details",function(e){
  jQuery(".ct-loading-main").show();
  var order = jQuery(this).attr("data-id");
  var gc_event_id = jQuery(this).attr("data-gc_event");
  var gc_staff_event_id = jQuery(this).attr("data-gc_staff_event");
  var pid = jQuery(this).attr("data-pid");
  var cancel_reson_book = jQuery("#reason_cancel" + order).val();
  if(check_update_if_btn == "0"){
    check_update_if_btn = "1";
    e.preventDefault();
    jQuery.ajax({
      type: "POST",
      data: { id: order, gc_event_id: gc_event_id, gc_staff_event_id: gc_staff_event_id, pid: pid, cancel_reson_book: cancel_reson_book, update_booking_users: 1 },
      url: ajax_url + "user_details_ajax.php",
      success: function (response) {
        check_update_if_btn = "0";
        jQuery(".mainheader_message").show();
        jQuery(".mainheader_message_inner").css("display", "inline");
        jQuery("#ct_sucess_message").text(errorobj_booking_cancel);
        jQuery(".mainheader_message").fadeOut(3000);
        jQuery("#info_modal_close").trigger("click");
        jQuery("#updateinfo_modal_close").trigger("click");
        jQuery(".closesss").trigger("click");
        location.reload();
      }
    });
  }
});
jQuery(document).on("change",".exp_cp_date",function() {
  jQuery.ajax({
    type: "post",
    data: { selected_dates: jQuery(this).val(), staff_id: jQuery(this).attr("data-staffid"), getmytimeslots: 1 },
    url: ajax_url + "user_details_ajax.php",
    success: function (res) {
      jQuery(".mytime_slots_booking").html(res);
      localStorage.setItem("time1",jQuery("#myuser_reschedule_time").val());
    }
  });
});
/* SET ORDER ID FOR UPDATE */
jQuery(document).on("click",".display_myappointment_data",function(){
  localStorage.setItem("order_id",jQuery(this).attr("data-order_id"));
  var total = jQuery(this).attr("data-total_price");
  jQuery(".booking_total_payment").html("<span class=''>"+total+"</span>");
});
jQuery(document).on("change","#myuser_reschedule_time",function(){
  localStorage.setItem("time1",jQuery(this).val());
});
localStorage.setItem("time1","");
/* RESCHEDULE FOR USERPROFILE */
jQuery(document).on("click",".my_user_btn_for_reschedule",function(e){
  jQuery(".ct-loading-main").show();
  if(check_update_if_btn == "0"){
    check_update_if_btn = "1";
    e.preventDefault();
    var order = jQuery(this).attr("data-order");
    var notes = jQuery(".my_user_notes_reschedule"+order).val();
    var dates = jQuery("#expiry_date"+order).val();
    var extension_js = jQuery("#extension_js").val();
    if(extension_js == "true") {
      var gc_event_id = jQuery(this).attr("data-gc_event");
      var gc_staff_event_id = jQuery(this).attr("data-gc_staff_event");
      var pid = jQuery(this).attr("data-pid");
    } else {
      var gc_event_id = "";
      var gc_staff_event_id = "";
      var pid = "";
    }
    var times1 = "";
    if(localStorage.getItem("time1") != ""){
      times1 =  localStorage.getItem("time1");
    }
    if(times1 == ""){
      check_update_if_btn = "0";
      jQuery(".close").trigger("click");
      jQuery(".mainheader_message_fail").show();
      jQuery(".mainheader_message_inner_fail").css("display", "inline");
      jQuery("#ct_sucess_message_fail").text(errorobj_sorry_we_are_not_available);
      jQuery(".mainheader_message_fail").fadeOut(3000);
    } else {
      jQuery.ajax({
        type : "post",
        data : { orderid : order, notes : notes, dates : dates, timess : times1, gc_event_id : gc_event_id, gc_staff_event_id : gc_staff_event_id, pid : pid, user : "customer", reschedulebooking : 1 },
        url : ajax_url+"user_details_ajax.php",
        success : function(res){
          if(parseInt(jQuery.trim(res))==1){
            jQuery(".close").trigger("click");
            jQuery(".mainheader_message").show();
            jQuery(".mainheader_message_inner").css("display", "inline");
            jQuery("#ct_sucess_message").text(errorobj_appointment_reschedules_successfully);
            jQuery(".mainheader_message").fadeOut(3000);
            location.reload();
          } else {
            check_update_if_btn = "0";
            jQuery(".close").trigger("click");
            jQuery(".mainheader_message_fail").show();
            jQuery(".mainheader_message_inner_fail").css("display", "inline");
            jQuery("#ct_sucess_message_fail").text(errorobj_sorry_we_are_not_available);
            jQuery(".mainheader_message_fail").fadeOut(3000);
          }
        }
      });
    }
  }
});
/*  Add sample data  */
jQuery(document).on("click", "#ct-sample-data", function () {
  jQuery(".ct-loading-main").show();
  jQuery.ajax({
    type : "post",
    data: { add_sample_data : 1 },
    url : ajax_url+"dummy_ajax.php",
    success : function(res){
      jQuery(".ct-loading-main").hide();
      location.reload();
    }
  });
});
/*  Remove sample data popup */
jQuery(document).on("click", "#ct-remove-sample-data", function () {
  jQuery("#ct-remove-sample-data-popup").modal("show");
});
/*  Remove sample data  */
jQuery(document).on("click", "#ct-remove-sample-data-ok", function () {
  jQuery(".ct-loading-main").show();
  jQuery.ajax({
    type : "post",
    data: { remove_sample_data : 1 },
    url : ajax_url+"dummy_ajax.php",
    success : function(res){
      jQuery(".ct-loading-main").hide();
      location.reload();
    }
  });
});
/*  Display Country Code on click flag on phone */
jQuery(document).on("click",".country",function() {
  var country_code=jQuery(this).attr("data-dial-code");
  jQuery("#adminphone").val("+"+country_code);
});
/* ADMIN SMS TEMPLATE SETTINGS START */
jQuery(document).on("click","#save_sms_template",function() {
  var id = jQuery(this).attr("data-id");
  var sms_message = jQuery('#sms_message_'+id).val();
  jQuery("#sms_template_form_"+id).validate({
    rules: {sms_message: {required: true}
    },messages: { sms_message: {required: errorobj_please_enter_sms_message}}
  });
  if (jQuery("#sms_template_form_"+id).valid()) {
    jQuery(".ct-loading-main").show();
    jQuery.ajax({
      type : "post",
      data: { id : id, sms_messages : sms_message, save_sms_template : 1 },
      url : ajax_url+"sms_template_ajax.php",
      success : function(res){
        jQuery(".ct-loading-main").hide();
        jQuery("#cm"+id).trigger("click");
        jQuery("#as"+id).trigger("click");
      }
    });
  }
});
jQuery(document).on("change",".save_client_sms_template_status",function() {
  jQuery(".ct-loading-main").show();
  var ajax_url = settingObj.ajax_url;
  var id = jQuery(this).attr("data-id");
  var client_status = jQuery("#sms-client"+id).prop("checked");
  var sms_template_status = "D";
  if (client_status == true) {
    sms_template_status = "E";
  }
  jQuery.ajax({
    type : "post",
    data: { id : id, sms_template_status : sms_template_status, save_sms_template_status : 1 },
    url : ajax_url+"sms_template_ajax.php",
    success : function(res){
      jQuery(".ct-loading-main").hide();
    }
  });
});
jQuery(document).on("change",".save_admin_sms_template_status",function() {
  jQuery(".ct-loading-main").show();
  var ajax_url = settingObj.ajax_url;
  var id = jQuery(this).attr("data-id");
  var admin_status = jQuery("#sms-admin"+id).prop("checked");
  var sms_template_status = "D";
  if (admin_status == true) {
    sms_template_status = "E";
  }
  jQuery.ajax({
    type : "post",
    data: { id : id, sms_template_status : sms_template_status, save_sms_template_status : 1 },
    url : ajax_url+"sms_template_ajax.php",
    success : function(res){
      jQuery(".ct-loading-main").hide();
    }
  });
});
jQuery(document).on("change", ".ct_show_hide_checkbox", function () {
  var toggle_id = jQuery(this).attr("data-id");
  /*  uncheck other checkbox  */
  jQuery(".ct_show_hide_checkbox").each(function () {
    if (jQuery(this).attr("data-id") != toggle_id) {
      jQuery(this).removeAttr("checked");
    }
  });
  /*  Hide details expect current  */
  jQuery(".sms_content").each(function () {
    if (jQuery(this).attr("id") != "detail_sms_template_"+toggle_id) {
      jQuery(this).hide("blind", {direction: "vertical"}, 500);
    }
  });
  /*  Show current details and hide other ones  */
  if (jQuery(this).is(":checked")) {
    jQuery(".detail_cm" + toggle_id).show("blind", {direction: "vertical"}, 1000);
    jQuery(".detail_as" + toggle_id).show("blind", {direction: "vertical"}, 1000);
  } else {
    jQuery(".detail_cm" + toggle_id).hide("blind", {direction: "vertical"}, 500);
    jQuery(".detail_as" + toggle_id).hide("blind", {direction: "vertical"}, 500);
  }
});
/* ADMIN SMS TEMPLATE SETTINGS END */

jQuery(document).on("change",".save_client_email_template_status",function() {
  jQuery(".ct-loading-main").show();
  var id = jQuery(this).attr("data-id");
  var client_status = jQuery("#email-client"+id).prop("checked");
  var email_template_status = "D";
  if (client_status == true) {
    email_template_status = "E";
  } 
  jQuery.ajax({
    type : "post",
    data: { id : id, email_template_status : email_template_status, save_email_template_status : 1 },
    url : ajax_url+"email_template_ajax.php",
    success : function(res){
      jQuery(".ct-loading-main").hide();
    }
  });
});
jQuery(document).on("change",".save_admin_email_template_status",function() {
  jQuery(".ct-loading-main").show();
  var id = jQuery(this).attr("data-id");
  var admin_status = jQuery("#email-admin"+id).prop("checked");
  email_template_status = "D";
  if (admin_status == true) {
    var email_template_status = "E";
  }
  jQuery.ajax({
    type : "post",
    data: { id : id, email_template_status : email_template_status, save_email_template_status : 1 },
    url : ajax_url+"email_template_ajax.php",
    success : function(res){
      jQuery(".ct-loading-main").hide();
    }
  });
});
jQuery(document).on("change",".save_staff_email_template_status",function() {
  jQuery(".ct-loading-main").show();
  var id = jQuery(this).attr("data-id");
  var admin_status = jQuery("#email-staff"+id).prop("checked");
  var email_template_status = "D";
  if (admin_status == true) {
    email_template_status = "E";
  }
  jQuery.ajax({
    type : "post",
    data: { id : id, email_template_status : email_template_status, save_email_template_status : 1 },
    url : ajax_url+"email_template_ajax.php",
    success : function(res){
      jQuery(".ct-loading-main").hide();
    }
  });
});
jQuery(document).on("change", ".ct_open_close_email_template", function () {
  var toggle_id = jQuery(this).attr("data-id");
  /*  uncheck other checkbox  */
  jQuery(".ct_open_close_email_template").each(function () {
    if (jQuery(this).attr("data-id") != toggle_id) {
      jQuery(this).removeAttr("checked");
    }
  });
  /*  Hide details expect current  */
  jQuery(".email_content").each(function () {
    if (jQuery(this).attr("id") != "detail_email_templates_"+toggle_id) {
      jQuery(this).hide("blind", {direction: "vertical"}, 500);
    }
  });
  /*  Show current details and hide other ones  */
  if (jQuery(this).is(":checked")) {
    jQuery(".detail_ce" + toggle_id).show("blind", {direction: "vertical"}, 1000);
    jQuery(".detail_ae" + toggle_id).show("blind", {direction: "vertical"}, 1000);
  } else {
    jQuery(".detail_ce" + toggle_id).hide("blind", {direction: "vertical"}, 500);
    jQuery(".detail_ae" + toggle_id).hide("blind", {direction: "vertical"}, 500);
  }
});
/* **** email template code end **** */
/* SAVE EMAIL AND SMS TEMPLATE IN DB */
jQuery(document).on("click","#default_email_contents",function() {
  var id = jQuery(this).attr("data-id");
  jQuery(".ct-loading-main").show();
  jQuery.ajax({
    type : "post",
    data: { id : id, default_email_content : 1 },
    url : ajax_url+"email_template_ajax.php",
    success : function(res){
      jQuery(".ct-loading-main").hide();
      jQuery("#email_message_"+id).val(res);
    }
  });
});
jQuery(document).on("click",".email_short_tags",function() {
  var id = jQuery(this).attr("data-id");
  var val = jQuery(this).attr("data-value");
  jQuery("#email_message_"+id).each(function(i) {
    if (document.selection) {
      /* For browsers like Internet Explorer */
      this.focus();
      sel = document.selection.createRange();
      sel.text = val;
      this.focus();
    } else if (this.selectionStart || this.selectionStart == "0") {
      /* For browsers like Firefox and Webkit based */
      var startPos = this.selectionStart;
      var endPos = this.selectionEnd;
      var scrollTop = this.scrollTop;
      this.value = this.value.substring(0, startPos) + val + this.value.substring(endPos, this.value.length);
      this.focus();
      this.selectionStart = startPos + val.length;
      this.selectionEnd = startPos + val.length;
      this.scrollTop = scrollTop;
    } else {
      this.value += val;
      this.focus();
    }
  });
});
jQuery(document).on("click","#default_sms_contents",function() {
  var id = jQuery(this).attr("data-id");
  jQuery(".ct-loading-main").show();
  jQuery.ajax({
    type : "post",
    data: { id : id, default_sms_content : 1 },
    url : ajax_url+"sms_template_ajax.php",
    success : function(res){
      jQuery(".ct-loading-main").hide();
      jQuery("#sms_message_"+id).val(res);
    }
  });
});
jQuery(document).on("click",".sms_short_tags",function() {
  var id = jQuery(this).attr("data-id");
  var val = jQuery(this).attr("data-value");
  jQuery("#sms_message_"+id).each(function(i) {
    if (document.selection) {
      /* For browsers like Internet Explorer */
      this.focus();
      sel = document.selection.createRange();
      sel.text = val;
      this.focus();
    } else if (this.selectionStart || this.selectionStart == "0") {
      /* For browsers like Firefox and Webkit based */
      var startPos = this.selectionStart;
      var endPos = this.selectionEnd;
      var scrollTop = this.scrollTop;
      this.value = this.value.substring(0, startPos) + val + this.value.substring(endPos, this.value.length);
      this.focus();
      this.selectionStart = startPos + val.length;
      this.selectionEnd = startPos + val.length;
      this.scrollTop = scrollTop;
    } else {
      this.value += val;
      this.focus();
    }
  });
});
/* SAVE EMAIL AND SMS TEMPLATE IN DB END */
/* DELETE THE BOOKINGS OF THE REGISTERED CUSTOMERS FROM CUSTOMER PAGE */
jQuery(document).on("click", ".mybtndelete_register_customers_entry", function () {
  jQuery(".ct-loading-main").show();
  var usersid = jQuery(this).attr("data-id");
  jQuery.ajax({
    type: "post",
    data: { delete_registered_bookings: 1, usersid: usersid },
    url: ajax_url + "customer_admin_ajax.php",
    success: function (res) {
      jQuery(".ct-loading-main").hide();
      jQuery("#ct-close-popover-customerss").trigger("click");
      jQuery("#myregisted_" + usersid).remove();
      jQuery(".mainheader_message").show();
      jQuery(".mainheader_message_inner").css("display", "inline");
      jQuery("#ct_sucess_message").text(errorobj_customer_deleted_successfully);
      jQuery(".mainheader_message").fadeOut(3000);
      window.location.reload();
    }
  }); 
});
jQuery(document).on("click","#loginbg",function(){
  var ajax_url = settingObj.ajax_url; 
  jQuery.ajax({
    type:"POST",
    url: ajax_url +"setting_ajax.php",
    data:{action:"delete_login_image"},
    success:function(){}
  });
});
jQuery(document).on("click","#frontbg",function(){
  var ajax_url = settingObj.ajax_url; 
  jQuery.ajax({
    type:"POST",
    url: ajax_url +"setting_ajax.php",
    data:{action:"delete_front_imge"},
    success:function(){     
    }
  });
});
jQuery(document).on("click", ".appearance_settings_btn_check", function(e){
  jQuery(".ct-loading-main").show();
  if(jQuery("#existing-and-new-user-checkout").prop("checked") === false && jQuery("#guest-user-checkout").prop("checked") === false){
    jQuery(".ct-loading-main").hide();
    jQuery(".mainheader_message_fail_appearance_setting").show();
    jQuery(".mainheader_message_inner_fail_appearance_setting").css("display", "block");
    jQuery("#ct_sucess_message_fail_appearance_setting").text(errorobj_please_select_atleast_one_checkout_method);
    jQuery(".mainheader_message_fail_appearance_setting").fadeOut(5000);
    e.preventDefault();
  }
});
/* service form reset */
jQuery(document).on("click","#reset_service_form",function(){
  jQuery("#addservice_form")[0].reset();
  var img_url=imgObj.img_url;
  var color_reset = jQuery("#ct-service-color-tag").val();
  jQuery("#pcasctimagename").attr("value","");
  jQuery("#pcasserviceimage").attr("src",img_url+"default_service.png");
  jQuery(".minicolors-swatch-color").css("background-color",color_reset);
});
/* Service addons reset*/
jQuery(document).on("click","#reset_service_addons",function(){
  jQuery("#mynewformfor_insertaddons")[0].reset();
  var img_url=imgObj.img_url;
  jQuery("#pcaoctimagename").attr("value","");
  jQuery("#pcaoaddonimage").attr("src",img_url+"default_service.png");
});
jQuery(document).on("click",".save_manage_form_fields",function(){
  jQuery(".ct-loading-main").show();
  var show_coupon_checkout = jQuery("#show-coupons-input-oc").prop("checked");
  var coupon_checkout = "off";
  if (show_coupon_checkout == true) {
    coupon_checkout = "on";
  }

  var show_refferal_checkout = jQuery("#show-referral-input-oc").prop("checked");
  var referral_checkout = "off";
  if (show_refferal_checkout == true) {
    referral_checkout = "on";
  }

  var company_header = jQuery("#Show_comapny_address").prop("checked");
  var company_header_address = "N";
  if (company_header == true) {
    company_header_address = "Y";
  }
  var appointment_details = jQuery("#hide_appoint_details").prop("checked");
  var appointment_details_display = "off";
  if (appointment_details == true) {
    appointment_details_display = "on";
  }
	var wallet_section = jQuery("#ct_wallet_section").prop("checked");
  var wallet_section_display = "off";
  if (wallet_section == true) {
    wallet_section_display = "on";
  }
	
	
  var company_logo_status = jQuery("#show_company_logo").prop("checked");
  var company_logo_display = "N";
  if (company_logo_status == true) {
    company_logo_display = "Y";
  }
  var company_title_status = jQuery("#show_company_title").prop("checked");
  var company_title_display = "N";
  if (company_title_status == true) {
    company_title_display = "Y";
  }
  var company_service_desc = jQuery("#show_desc_front").prop("checked");
  var company_service_desc_status = "N";
  if (company_service_desc == true) {
    company_service_desc_status = "Y";
  }
  var company_willwe_getin = jQuery("#show_how_willwe_getin_front").prop("checked");
  var company_willwe_getin_status = "N";
  if (company_willwe_getin == true) {
    company_willwe_getin_status = "Y";
  }
  var ct_subheaders = jQuery("#ct_subheaders").prop("checked");
  var ct_subheaders_status = "N";
  if (ct_subheaders == true) {
    ct_subheaders_status = "Y";
  }
  var front_lang_dd = jQuery("#front_lang_dd").prop("checked");
  var front_lang_dd_status = "N";
  if (front_lang_dd == true) {
    var front_lang_dd_status = "Y";
  }
  var ct_vc_status_ch = jQuery("#ct_vc_status").prop("checked");
  var ct_vc_status = "N";
  if (ct_vc_status_ch == true) {
    var ct_vc_status = "Y";
  }
  var ct_p_status_ch = jQuery("#ct_p_status").prop("checked");
  var ct_p_status = "N";
  if (ct_p_status_ch == true) {
    ct_p_status = "Y";
  }
  /* form fields */
  var preferred_password_min = jQuery(".pass_min").val();
  var preferred_password_max = jQuery(".pass_max").val();
  var ct_bf_first_name_1 = jQuery("#ct_bf_first_name_1").prop("checked");
  var ct_bf_first_name_1_status = "off";
  if (ct_bf_first_name_1 == true) {
    ct_bf_first_name_1_status = "on";
  }
  var ct_bf_first_name_2 = jQuery("#ct_bf_first_name_2").prop("checked");
  var ct_bf_first_name_2_status = "N";
  if (ct_bf_first_name_2 == true) {
    ct_bf_first_name_2_status = "Y";
  }
  var ct_bf_first_name_3 =  jQuery(".fname_min").val();
  var ct_bf_first_name_4 =  jQuery(".fname_max").val();
  var ct_bf_last_name_1 = jQuery("#cff_last_name_1").prop("checked");
  var ct_bf_last_name_1_status = "off";
  if (ct_bf_last_name_1 == true) {
    ct_bf_last_name_1_status = "on";
  }
  var ct_bf_last_name_2 = jQuery("#cff_last_name_2").prop("checked");
  var ct_bf_last_name_2_status = "N";
  if (ct_bf_last_name_2 == true) {
    ct_bf_last_name_2_status = "Y";
  }
  var ct_bf_last_name_3 =  jQuery(".lname_min").val();
  var ct_bf_last_name_4 =  jQuery(".lname_max").val();
  var ct_bf_phone_1 = jQuery("#cff_phone_1").prop("checked");
  var ct_bf_phone_1_status = "off";
  if (ct_bf_phone_1 == true) {
    ct_bf_phone_1_status = "on";
  }
  var ct_bf_phone_2 = jQuery("#cff_phone_2").prop("checked");
  var ct_bf_phone_2_status = "N";
  if (ct_bf_phone_2 == true) {
    ct_bf_phone_2_status = "Y";
  }
  var ct_bf_phone_3 =  jQuery(".phone_min").val();
  var ct_bf_phone_4 =  jQuery(".phone_max").val();
  var ct_bf_address_1 = jQuery("#cff_street_address_1").prop("checked");
  var ct_bf_address_1_status = "off";
  if (ct_bf_address_1 == true) {
    ct_bf_address_1_status = "on";
  }
  var ct_bf_address_2 = jQuery("#cff_street_address_2").prop("checked");
  var ct_bf_address_2_status = "N";
  if (ct_bf_address_2 == true) {
    ct_bf_address_2_status = "Y";
  }
  var ct_bf_address_3 =  jQuery(".street_address_min").val();
  var ct_bf_address_4 =  jQuery(".street_address_max").val();
  var ct_bf_zip_1 = jQuery("#cff_zip_code_1").prop("checked");
  var ct_bf_zip_1_status = "off";
  if (ct_bf_zip_1 == true) {
    var ct_bf_zip_1_status = "on";
  }
  var ct_bf_zip_2 = jQuery("#cff_zip_code_2").prop("checked");
  var ct_bf_zip_2_status = "N";
  if (ct_bf_zip_2 == true) {
    ct_bf_zip_2_status = "Y";
  }
  var ct_bf_zip_3 =  jQuery(".zip_code_min").val();
  var ct_bf_zip_4 =  jQuery(".zip_code_max").val();
  var ct_bf_city_1 = jQuery("#cff_city_1").prop("checked");
  var ct_bf_city_1_status = "off";
  if (ct_bf_city_1 == true) {
    ct_bf_city_1_status = "on";
  }
  var ct_bf_city_2 = jQuery("#cff_city_2").prop("checked");
  var ct_bf_city_2_status = "N";
  if (ct_bf_city_2 == true) {
    ct_bf_city_2_status = "Y";
  }
  var ct_bf_city_3 =  jQuery(".city_min").val();
  var ct_bf_city_4 =  jQuery(".city_max").val();
  /* STATES */
  var ct_bf_state_1 = jQuery("#cff_state_1").prop("checked");
  var ct_bf_state_1_status = "off";
  if (ct_bf_state_1 == true) {
    ct_bf_state_1_status = "on";
  }
  var ct_bf_state_2 = jQuery("#cff_state_2").prop("checked");
  var ct_bf_state_2_status = "N";
  if (ct_bf_state_2 == true) {
    ct_bf_state_2_status = "Y";
  }
  var ct_bf_state_3 =  jQuery(".state_min").val();
  var ct_bf_state_4 =  jQuery(".state_max").val();
  /* NOTES */
  var ct_bf_notes_1 = jQuery("#cff_notes_1").prop("checked");
  var ct_bf_notes_1_status = "off";
  if (ct_bf_notes_1 == true) {
    ct_bf_notes_1_status = "on";
  }
  var ct_bf_notes_2 = jQuery("#cff_notes_2").prop("checked");
  var ct_bf_notes_2_status = "N";
  if (ct_bf_notes_2 == true) {
    ct_bf_notes_2_status = "Y";
  }
  var ct_bf_notes_3 =  jQuery(".notes_min").val();
  var ct_bf_notes_4 =  jQuery(".notes_max").val();
  /* form fields */
  var dataString = { coupon_checkout : coupon_checkout,referral_checkout:referral_checkout,company_header_address : company_header_address, company_logo_display : company_logo_display, company_title_display : company_title_display, company_service_desc_status : company_service_desc_status, appointment_details_display : appointment_details_display, company_willwe_getin_status : company_willwe_getin_status, ct_subheaders : ct_subheaders_status, ct_vc_status : ct_vc_status, ct_p_status : ct_p_status, ct_bf_notes_1 : ct_bf_notes_1_status, ct_bf_notes_2 : ct_bf_notes_2_status, ct_bf_notes_3 : ct_bf_notes_3, ct_bf_notes_4 : ct_bf_notes_4, ct_bf_first_name_1 : ct_bf_first_name_1_status, ct_bf_first_name_2 : ct_bf_first_name_2_status, ct_bf_first_name_3 : ct_bf_first_name_3, ct_bf_first_name_4 : ct_bf_first_name_4, ct_bf_last_name_1 : ct_bf_last_name_1_status, ct_bf_last_name_2 : ct_bf_last_name_2_status, ct_bf_last_name_3 : ct_bf_last_name_3, ct_bf_last_name_4 : ct_bf_last_name_4, ct_bf_phone_1 : ct_bf_phone_1_status, ct_bf_phone_2 : ct_bf_phone_2_status, ct_bf_phone_3 : ct_bf_phone_3, ct_bf_phone_4 : ct_bf_phone_4, ct_bf_address_1 : ct_bf_address_1_status, ct_bf_address_2 : ct_bf_address_2_status, ct_bf_address_3 : ct_bf_address_3, ct_bf_address_4 : ct_bf_address_4, ct_bf_zip_1 : ct_bf_zip_1_status, ct_bf_zip_2 : ct_bf_zip_2_status, ct_bf_zip_3 : ct_bf_zip_3, ct_bf_zip_4 : ct_bf_zip_4, ct_bf_city_1 : ct_bf_city_1_status, ct_bf_city_2 : ct_bf_city_2_status, ct_bf_city_3 : ct_bf_city_3, ct_bf_city_4 : ct_bf_city_4, ct_bf_state_1 : ct_bf_state_1_status, ct_bf_state_2 : ct_bf_state_2_status, ct_bf_state_3 : ct_bf_state_3, ct_bf_state_4 : ct_bf_state_4, front_lang_dd : front_lang_dd_status, preferred_password_min : preferred_password_min, wallet_section_display : wallet_section_display ,preferred_password_max : preferred_password_max, "manage_form_fields_setting" : "yes" };
  var check_status = 0;
  jQuery(".v_c").each(function(){
    var fors = jQuery(this).attr("data-names");
    if(parseInt(jQuery(this).val()) > parseInt(jQuery(".v_c_"+fors).val())){
      jQuery(this).css("border-color","red");
      jQuery(".v_c_"+fors).css("border-color","red");
      check_status = check_status+1;
    }
  });
  if(check_status == 0){
    jQuery.ajax({
      type: "POST",
      url: ajax_url + "setting_ajax.php",
      data: dataString,
      success: function (response){
        jQuery(".ct-loading-main").hide();
      }
    });
  }
  else{
    jQuery(".mainheader_message_fail").show();
    jQuery(".mainheader_message_inner_fail").css("display","inline");
    jQuery("#ct_sucess_message_fail").html(errorobj_invalid_values);
    jQuery(".mainheader_message_fail").fadeOut(5000);
    jQuery(".ct-loading-main").hide();
  } 
});
jQuery(document).on("click",".save_staff",function(){
  var email = jQuery(".staff_email").val();
  var name = jQuery(".staff_name").val();
  var pass = jQuery(".staff_pass").val();
  var role = "staff";
  if (!jQuery("#staff_insert").valid()) { return false; }
  if(jQuery("#staff_insert").valid()){
    jQuery.ajax({
      type : "POST",
      data : {"email":email,"pass" : pass,"name" : name,"role":role,"staff_add" : "add"},
      url : ajax_url + "staff_ajax.php",
      success : function(res){
        location.reload();
      }
    });
  }
});
/*validation  for staff insert form*/
jQuery(document).ready(function(){
  jQuery("#staff_insert").validate({
    rules: {
      staff_email:{
        required: true,
        email:true,
        remote: {
          url:ajax_url+"staff_ajax.php",
          type: "POST"
        }
      },
      staff_name: {
        required:true,
      },
      staff_pass: {
        required:true,
        minlength: 8,
        maxlength: 15
      },
    },
    messages: {
      staff_email:{
      required:errorobj_please_enter_email,email:errorobj_please_enter_valid_email_address,remote:errorobj_email_already_exists 
      },
      staff_name: {
      required: errorobj_please_enter_name,
      },
      staff_pass: {
      required: errorobj_please_enter_password,
      min: errorobj_please_enter_minimum_8_characters,
      max: errorobj_please_enter_maximum_15_characters,
      },
    }
  });
});
jQuery(document).on("click",".staff_click",function(){
  jQuery(".ct-loading-main").show();
  var staff_id = jQuery(this).attr("data-id");
  jQuery.ajax({
    type : "POST",
    data : {"staff_id" : staff_id,"staff_detail" : "yes"},
    url : ajax_url + "staff_ajax.php",
    success : function(res){
      jQuery(".get_staff_details").html(res);
    }
  });
  jQuery(".ct-loading-main").hide();
});
/* staff availability time */
/* UPDATE ALL ENTRY OF THE MONTHLY SCHEDULE */
jQuery(document).on("click", ".btnupdatenewtimeslots_monthly_staff", function () {
  jQuery(".ct-loading-main").show();
  var starttimenew = [];
  var endtimenew = [];
  var chkdaynew = [];
  var staff_id = jQuery(this).attr("data-id");
  jQuery(".chkdaynew").each(function () {
    if (jQuery(this).prop("checked") == true) {
      chkdaynew.push("N");
    } else {
      chkdaynew.push("Y");
    }
  });
  jQuery(".starttimenew").each(function () {
    starttimenew.push(jQuery(this).val());
  });
  jQuery(".endtimenew").each(function () {
    endtimenew.push(jQuery(this).val());
  });
  var st = starttimenew.filter(function (v) {
    return v !== ""
  });
  var et = endtimenew.filter(function (v) {
    return v !== ""
  });
  var s = 1;
  for(var i = 0;i<=starttimenew.length;i++){
    if(starttimenew[i] > endtimenew[i]){
      s++;
    }
  }
  if(s>1){
    jQuery(".mainheader_message_fail").show();
    jQuery(".mainheader_message_inner_fail").css("display","inline");
    jQuery("#ct_sucess_message_fail").html(errorobj_please_select_porper_time_slots);
    jQuery(".mainheader_message_fail").fadeOut(5000);
    jQuery(".ct-loading-main").hide();
  } else {
    jQuery.ajax({
      type: "post",
      data: { "chkday": chkdaynew, "starttime": st, "endtime": et, "staff_id" : staff_id, "operation_insertmonthlyslots_staff": 1 },
      url: ajax_url + "weekday_ajax.php",
      success: function (res) {
        jQuery(".ct-loading-main").hide();
        jQuery(".mainheader_message").show();
        jQuery(".mainheader_message_inner").css("display", "inline");
        jQuery("#ct_sucess_message").text(errorobj_time_slots_updated_successfully);
        jQuery(".mainheader_message").fadeOut(3000);
        location.reload();
      }
    });
  }
});
jQuery(document).on("click",".staff_link_clicked",function(){
  localStorage["trigger_user"] = "";
});
/*update staff details*/
jQuery(document).on("click","#update_staff_details",function(){
  if(jQuery("#staff_update_details").valid()){
    jQuery(".ct-loading-main").show();
    var id = jQuery(this).attr("data-id");
    localStorage["trigger_user"] = id;
    var name = jQuery("#ct-member-name").val();
    var email = jQuery("#ct-member-email").val();
    var desc = jQuery("#ct-member-desc").val();
    var phone = jQuery("#phone-number").val();
    var address = jQuery("#ct-member-address").val();
    var ct_service_staff = jQuery("#ct_service_staff").val();
    var staff_booking = jQuery("#enable-booking1").prop("checked");
    if (staff_booking == true) {
      staff_booking = "Y";
    } else {
      staff_booking = "N";
    }
    var city = jQuery("#ct-member-city").val();
    var state = jQuery("#ct-member-state").val();
    var zip = jQuery("#ct-member-zip").val();
    var country = jQuery("#ct-member-country").val();
    var old_schedule = jQuery(this).attr("data-old_schedule_type");
    var staff_image = jQuery("#pppp"+id+"ctimagename").val();
    jQuery.ajax({
      type : "POST",
      data : {"id":id,"name" : name,"email":email,"desc":desc,"phone":phone,"address":address,"staff_booking":staff_booking,"city":city,"state":state,"zip":zip,"country":country,"staff_update" : "update","old_schedule" : old_schedule,"staff_image": staff_image,"ct_service_staff":ct_service_staff},
      url : ajax_url + "staff_ajax.php",
      success : function(res){
        jQuery(".ct-loading-main").hide();
        location.reload();
      }
    });
  }
});

/*update staff details*/
jQuery(document).on("click","#update_staff_details_staffsection",function(){
  if(jQuery("#staff_update_details").valid()){
    jQuery(".ct-loading-main").show();
    var id = jQuery(this).attr("data-id");
    localStorage["trigger_user"] = id;
    var name = jQuery("#ct-member-name").val();
    var email = jQuery("#ct-member-email").val();
    var desc = jQuery("#ct-member-desc").val();
    var phone = jQuery("#phone-number").val();
    var address = jQuery("#ct-member-address").val();
    var ct_service_staff = jQuery("#ct_service_staff").val();
    var ct_member_latitude = jQuery("#ct-member-latitude").val();
    var ct_member_longitude = jQuery("#ct-member-longitude").val();

    var APIUsername = jQuery('#APIUsername').val();
    var APIPassword = jQuery('#APIPassword').val();
    var APISignature = jQuery('#APISignature').val();
    /* var APItestmode = jQuery('#APItestmode').val(); */
    
    var APItestmode = jQuery("#APItestmode").prop("checked");
    if (APItestmode == true) {
      APItestmode = "Y";
    } else {
      APItestmode = "N";
    }
    
    var staff_booking = jQuery("#enable-booking1").prop("checked");
    if (staff_booking == true) {
      staff_booking = "Y";
    } else {
      staff_booking = "N";
    }
    var city = jQuery("#ct-member-city").val();
    var state = jQuery("#ct-member-state").val();
    var zip = jQuery("#ct-member-zip").val();
    var country = jQuery("#ct-member-country").val();
    var old_schedule = jQuery(this).attr("data-old_schedule_type");
    var staff_image = jQuery("#pppp"+id+"ctimagename").val();
    jQuery.ajax({
      type : "POST",
      data : {"id":id,"name" : name,"email":email,"desc":desc,"phone":phone,"latitude":ct_member_latitude,"longitude":ct_member_longitude,"address":address,"staff_booking":staff_booking,"city":city,"state":state,"zip":zip,"country":country,"staff_update" : "update","old_schedule" : old_schedule,"APIUsername":APIUsername,"APIPassword":APIPassword,"APISignature":APISignature,"APItestmode":APItestmode,"staff_image": staff_image,"ct_service_staff":ct_service_staff},
      url : ajax_url + "staff_ajax.php",
      success : function(res){
        jQuery(".ct-loading-main").hide();
        location.reload();
      }
    });
  }
});

/*end validations*/
jQuery(document).on("click",".save_staff_booking",function(){
  var staff_ids = jQuery("#staff_select").val();
 
  if(staff_ids != null){ 
    jQuery(this).addClass("disabled");
    jQuery(".remove_add_fafa_class").removeClass("fa-pencil-square-o");
    jQuery(".remove_add_fafa_class").addClass("fa-refresh fa-spin nm");
    jQuery.ajax({
      type : "POST",
      data : {"staff_ids" : staff_ids,"assign_staff_booking" : "yes","order_id" : jQuery(this).attr("data-orderid")},
      url : ajax_url + "staff_ajax.php",
      success : function(res){
        jQuery(".save_staff_booking").removeClass("disabled");
        jQuery(".remove_add_fafa_class").addClass("fa-pencil-square-o");
        jQuery(".remove_add_fafa_class").removeClass("fa-refresh fa-spin nm");
        window.location.reload();
      }
    });
  } 
});

jQuery( document ).ajaxComplete(function() {
  jQuery(".selectpicker").selectpicker({
    container: "body",
  }); 
});


jQuery(document).on("click",".staff_delete",function(){
  var id = jQuery(this).attr("data-id");
  jQuery.ajax({
    type :"POST",
    data : {"staff_id" : id,"delete_staff" : "yes"},
    url : ajax_url + "staff_ajax.php",
    success : function(res){
      location.reload();
    }
  });
});
jQuery(document).on("click",".save_front_form_error_labels",function(){
  jQuery(".ct-loading-main").show();
  var ajax_url = settingObj.ajax_url;
  var id = jQuery(this).attr("data-id");
  var labelvalue_front_error = {};
  jQuery(".langlabel_front_error_"+id).each(function () {
    labelvalue_front_error[jQuery(this).attr("data-id")] = jQuery(this).val();
  });
  var dataString = { id : id, labels_front_error: labelvalue_front_error, update_labels : jQuery("#update_labels").val(), change_language : 1 }
  jQuery.ajax({
    type: "POST",
    url: ajax_url + "setting_ajax.php",
    data: dataString,
    success: function (response) {
      jQuery(".ct-loading-main").hide();
    }
  });
});
var serviceimagename = "";
jQuery(document).on("click", ".ct_upload_img_staff", function (e) {
  jQuery(".ct-loading-main").show();
  var img_site_url = servObj.site_url;
  var imgObj_url = imgObj.img_url;
  var imageuss = jQuery(this).attr("data-us");

  var staffid = jQuery(this).attr("data-staff_id");
  var imageids = jQuery(this).attr("data-imageinputid");   
  var file_data = jQuery("#" + jQuery(this).attr("data-imageinputid")).prop("files")[0];
  console.log(file_data);
  var formdata = new FormData();
  var ctus = jQuery(this).attr("data-us");
  var img_w = jQuery("#" + ctus + "w").val();
  var img_h = jQuery("#" + ctus + "h").val();
  var img_x1 = jQuery("#" + ctus + "x1").val();
  var img_x2 = jQuery("#" + ctus + "x2").val();
  var img_y1 = jQuery("#" + ctus + "y1").val();
  var img_y2 = jQuery("#" + ctus + "y2").val();
  var img_name = jQuery("#" + ctus + "newname").val();
  var img_id = jQuery("#" + ctus + "id").val();
  formdata.append("image", file_data);
  formdata.append("w", img_w);
  formdata.append("h", img_h);
  formdata.append("x1", img_x1);
  formdata.append("x2", img_x2);
  formdata.append("y1", img_y1);
  formdata.append("y2", img_y2);
  formdata.append("newname", img_name);
  formdata.append("img_id", img_id);
  jQuery.ajax({
    url: ajax_url + "upload.php",
    type: "POST",
    data: formdata,
    cache: false,
    contentType: false,
    processData: false,
    success: function (data) {
      jQuery(".ct-loading-main").hide();
      if (data == "") {
        jQuery(".error-service").addClass("show");
        jQuery(".hidemodal").trigger("click");
      } else {
        jQuery("#" + ctus + "ctimagename").val(data);
        jQuery(".hidemodal").trigger("click");
        jQuery("#" + ctus + "staffimage").attr("src", imgObj_url + "services/" + data);
        jQuery("#staff_image_"+staffid).attr("src", imgObj_url + "services/" + data);
        jQuery(".small-staff-image"+staffid).attr("src", imgObj_url + "services/" + data);
        jQuery(".error_image").hide();
        jQuery("#" + ctus + "stafafimage").attr("data-imagename", data);
        staffimagename = jQuery("#" + ctus + "staffimage").attr("data-imagename");
        jQuery("#ser_cam_btn").css("display","block");
        jQuery("#ser_new_del").css("display","none");
      }
      jQuery("#"+imageids).val("");
    }
  });
});
/* delete staff image */
jQuery(document).on("click","#staff_del_images",function(){
  var staff_id=jQuery(this).attr("data-staff_id");
  var imgObj_url = imgObj.img_url;
  var datastring={staff_id:staff_id,action:"delete_staff_image"};
  jQuery.ajax({
    type:"POST",
    url:ajax_url+"staff_ajax.php",
    data:datastring,
    success:function(response){
      jQuery("#staff_image_"+staff_id).attr("src",imgObj_url + "user.png");
      jQuery("#pppp"+staff_id+"staffimage").attr("src",imgObj_url + "user.png");
      jQuery("#pppp"+staff_id+"ctimagename").val("");
      jQuery(".small-staff-image"+staff_id).attr("src", imgObj_url + "user.png");
      jQuery(".ser_cam_btn"+staff_id).css("display","block");
      jQuery("#ct-remove-staff-imagepppp"+staff_id).css("display","none");
      jQuery(".popover").fadeOut();
    }
  });
});
jQuery(document).on("click",".show_staff_payment_details",function(){
  jQuery(".custm_staff_payment_details").html("<tr><td align='center' colspan='5'>Loading...</td></tr>");
  var staff_ids=jQuery(this).attr("data-staff_ids");
  var order_id=jQuery(this).attr("data-order_id");
  var datastring={staff_ids:staff_ids,order_id:order_id,"staff_payment_details":1};
  jQuery.ajax({
    type:"POST",
    url:ajax_url+"staff_commision_ajax.php",
    data:datastring,
    success:function(res){
      jQuery(".custm_staff_payment_details").html(res);
    }
  });
});
jQuery(document).on("keyup",".sp_staff_amount",function(){
  var sid = jQuery(this).attr("data-id");
  var total = parseInt(jQuery(this).val())+parseInt(jQuery("#sp_staff_advance_paid"+sid).val());
  jQuery("#sp_staff_net_total"+sid).val(total);
  jQuery(".sp_staff_net_total"+sid).html(total);
});
jQuery(document).on("keyup",".sp_staff_advance_paid",function(){
  var sid = jQuery(this).attr("data-id");
  var total = parseInt(jQuery(this).val())+parseInt(jQuery("#sp_staff_amount"+sid).val());
  jQuery("#sp_staff_net_total"+sid).val(total);
  jQuery(".sp_staff_net_total"+sid).html(total);
});

jQuery(document).on("click",".save_sp_staff_commision",function(){
  var staff_pymnt_id="";
  var sp_staff_amount="";
  var sp_staff_advance_paid="";
  var sp_staff_net_total="";
  var i=1;
  var j=1;
  var k=1;
  var l=1;
  jQuery(".staff_pymnt_id").each(function(){
    if(i == 1){
      staff_pymnt_id += jQuery(this).val();
    }else{
      staff_pymnt_id += ","+jQuery(this).val();
    }
    i = i + 1;
  });
  jQuery(".sp_staff_amount").each(function(){
    if(j == 1){
      sp_staff_amount += jQuery(this).val();
    }else{
      sp_staff_amount += ","+jQuery(this).val();
    }
    j = j + 1;
  });
  jQuery(".sp_staff_advance_paid").each(function(){
    if(k == 1){
      sp_staff_advance_paid += jQuery(this).val();
    }else{
      sp_staff_advance_paid += ","+jQuery(this).val();
    }
    k = k + 1;
  });
  jQuery(".sp_staff_net_total").each(function(){
    if(l == 1){
      sp_staff_net_total += jQuery(this).val();
    }else{
      sp_staff_net_total += ","+jQuery(this).val();
    }
    l = l + 1;
  });
  var staff_pymnt_orderid = jQuery(".staff_pymnt_orderid").val();
  var datastring={staff_pymnt_id:staff_pymnt_id,sp_staff_amount:sp_staff_amount,sp_staff_advance_paid:sp_staff_advance_paid,sp_staff_net_total:sp_staff_net_total,staff_pymnt_orderid:staff_pymnt_orderid,"staff_payment_save":1};
  jQuery.ajax({
    type:"POST",
    url:ajax_url+"staff_commision_ajax.php",
    data:datastring,
    success:function(res){
      if(res == "not_ok_comission"){
        jQuery(".comission_error_display").removeClass("hide");
        return false;
      }else{
        jQuery(".close_spc_popup").trigger("click");
        location.reload();
      }
    }
  });
});

jQuery(document).on('click','.request_for_transfer',function(){ 
  jQuery('.ct-loading-main').show();
  var site_url=site_ur.site_url;
  var email_id = jQuery(this).data('email');
  var staffid = jQuery(this).data('staffid');
  var currentamount = jQuery(this).data('currentamount');
  var transfer_amount_value = jQuery('#transfer_amount_value').val();
  if(currentamount < transfer_amount_value){
    jQuery('.wallet_error').css('display', 'block');
    jQuery('.ct-loading-main').hide();
    return false;
  }else{
    jQuery('.wallet_error').css('display', 'none');
    jQuery('.ct-loading-main').hide();
  }
  jQuery.ajax({
    type: 'post',
    data: {'email_id': email_id, 'staffid': staffid, 'transfer_amount_value': transfer_amount_value, 'currentamount': currentamount, 'action':'money_transfer_request'
    },
    url: ajax_url + "staff_ajax.php",
    success: function (res) {
      window.location.reload();
    }
  });
});

jQuery(document).on("click", ".get_staff_bookingandpayment_by_dateser", function () {
  jQuery(".ct-loading-main").show();
  var startDate = reportrange_startDate.format('YYYY-MM-DD HH:mm');
  var endDate = reportrange_endDate.format('YYYY-MM-DD HH:mm');
  var service_id = jQuery(".get_serid_for_staff_pymnt option:selected").val();
  var table = jQuery("#payments-staff-bookingandpymnt-details-ajax").DataTable();
  jQuery.ajax({
    type: "post",
    data: {get_staff_bookingandpayment_by_dateser: 1, startdate: startDate, enddate: endDate, service_id: service_id},
    url: ajax_url + "staff_ajax.php",
    success: function (res) {
      jQuery(".ser_staffpayment_append").html(res);
      jQuery(".ct-loading-main").hide();
    }
  });
});
jQuery(document).on("click", ".get_payment_staff_by_date", function () {
  jQuery(".ct-loading-main").show();
  var startDate = staff_payment_startDate.format('YYYY-MM-DD HH:mm');
  var endDate = staff_payment_endDate.format('YYYY-MM-DD HH:mm');
  var table = jQuery("#payments-staffp-details-ajax").DataTable();
  jQuery.ajax({
    type: "post",
    data: {get_payment_staff_by_date: 1, startdate: startDate, enddate: endDate},
    url: ajax_url + "staff_ajax.php",
    success: function (res) {
      jQuery(".get_payment_staff_by_date_append").html(res);
      jQuery(".ct-loading-main").hide();
    }
  });
});
/* recurrence booking */
jQuery(document).on("change","#ct_recurrence_booking_status",function () {
  jQuery(".ct-loading-main").show();
  var recurrence_booking_status = jQuery(this).prop("checked");
  var ct_recurrence_booking_status = "N";
  if(recurrence_booking_status == true) {
    ct_recurrence_booking_status = "Y";
  }
  var datastring = { "ct_recurrence_booking_status" : ct_recurrence_booking_status, "ct_recurrence_booking" : "1" };
  jQuery.ajax({
    type: "post",
    data: datastring,
    url: ajax_url + "setting_ajax.php",
    success: function (res) {
      if(recurrence_booking_status == true) {
        jQuery(".reccurence_div").slideDown(2000);
        jQuery(".plans_on_stripe_labels").slideDown(2000);
        jQuery(".plans_on_stripe_div").slideDown(2000);
      } else {
        jQuery(".reccurence_div").slideUp(2000);
        jQuery(".plans_on_stripe_labels").slideUp(2000);
        jQuery(".plans_on_stripe_div").slideUp(2000);
      }
      jQuery(".ct-loading-main").hide();
    }
  });
});
/* quickbooks */
jQuery(document).on("change","#ct_quickbooks_status",function () {
  //jQuery(".ct-loading-main").show();
  var quickbooks_status = jQuery(this).prop("checked");
  var ct_quickbooks_status = "N";
  if(quickbooks_status == true) {
    ct_quickbooks_status = "Y";
  }
  
  if(quickbooks_status == true) {
    //alert(quickbooks_status);
    jQuery(".quickbooks_credentials").slideDown(1000);
    //jQuery(".quickbooks_credentials").show();
  } else {
    //alert(quickbooks_status);
    jQuery(".quickbooks_credentials").slideUp(1000);
    //jQuery(".quickbooks_credentials").hide();
  }
  //jQuery(".ct-loading-main").hide();
});

jQuery(document).on("click",".save_quickbooks",function () {
  var ID = jQuery("#ct_quickbooks_client_ID").val();
  var secret = jQuery("#ct_quickbooks_client_secret").val();

  if (ID == '' || secret == '') {
    jQuery("#connection_button").hide();
  }

  if(jQuery("#ct_quickbooks_status").prop('checked') == true){
    if (ID == '') {
      jQuery("#qb_client_id_error").show();
      jQuery("#qb_client_id_error").fadeOut(2000);
      return false;
    }
    if (secret == '') {
      jQuery("#qb_client_secret_error").show();
      jQuery("#qb_client_secret_error").fadeOut(2000);
      return false;
    }
    var status = 'Y';
  }else{
    var status = 'N';
  }
	
	if(jQuery("#ct_qb_account").prop('checked') == true){
		var account = 'development';
	}else{
		var account = 'production';
	}
	
  if (ID != '' && secret != '') {
    jQuery("#connection_button").show();
  }else{
    jQuery("#connection_button").hide();
  }

  jQuery(".ct-loading-main").show();
  var dataString = { ID:ID, secret:secret, status:status, account:account, action:"update_quickbooks_setting" };
  jQuery.ajax({
    type: "post",
    data: dataString,
    url: ajax_url + "setting_ajax.php",
    success: function (res) {
      jQuery(".ct-loading-main").hide();
      window.location.reload();
    }
  });
});

/* xero */
jQuery(document).on("change","#ct_xero_status",function () {
  var xero_status = jQuery(this).prop("checked");
  var ct_xero_status = "N";
  if(xero_status == true) {
    ct_xero_status = "Y";
  }
  
  if(xero_status == true) {
    jQuery(".xero_credentials").slideDown(1000);
  } else {
    jQuery(".xero_credentials").slideUp(1000);
  }
});

jQuery(document).on("click",".save_xero",function () {
  var ID = jQuery("#ct_xero_client_ID").val();
  var secret = jQuery("#ct_xero_client_secret").val();

  if (ID == '' || secret == '') {
    jQuery("#xero_connection_button").hide();
  }

  if(jQuery("#ct_xero_status").prop('checked') == true){
    if (ID == '') {
      jQuery("#xero_client_id_error").show();
      jQuery("#xero_client_id_error").fadeOut(2000);
      return false;
    }
    if (secret == '') {
      jQuery("#xero_client_secret_error").show();
      jQuery("#xero_client_secret_error").fadeOut(2000);
      return false;
    }
    var status = 'Y';
  }else{
    var status = 'N';
  }
	
  if (ID != '' && secret != '') {
    jQuery("#xero_connection_button").show();
  }else{
    jQuery("#xero_connection_button").hide();
  }

  jQuery(".ct-loading-main").show();
  var dataString = { ID:ID, secret:secret, status:status, action:"update_xero_setting" };
  jQuery.ajax({
    type: "post",
    data: dataString,
    url: ajax_url + "setting_ajax.php",
    success: function (res) {
      jQuery(".ct-loading-main").hide();
      window.location.reload();
    }
  });
});

/* add new reccurence click event */
jQuery(document).on("click","#ct-add-reccurence",function(){
  jQuery(".add_rec_li").show();
  jQuery("#spssadd").trigger("click");
});
jQuery(document).on("click",".btnaddreccurence",function(){
  jQuery(".ct-loading-main").show();
  var name  = jQuery("#txtfreqnameadd").val();
  var label  = jQuery("#txtfreqlabeladd").val();
  var days  = jQuery("#txtfreqdaysidadd").val();
  var types  = jQuery("#txtfreqtypeadd").val();
  var values  = jQuery("#txtfreqvalueidadd").val();
  jQuery("#freq_discount_formadd").validate();
  jQuery("#txtfreqnameadd").rules("add",{
    required: true,
    messages: {required: errorobj_please_enter_name}
  });
  jQuery("#txtfreqvalueidadd").rules("add",{
    required: true,pattern_price : true,
    messages: {required: errorobj_please_enter_valid_value_for_discount,pattern_price: errorobj_please_enter_valid_value_for_discount}
  });
  jQuery("#txtfreqlabeladd").rules("add", {
    required: true,
    messages: {required: errorobj_please_enter_title}
  });
  jQuery("#txtfreqdaysidadd").rules("add",{
    required: true,pattern_cp : true,maxlength: 2,
    messages: {required: errorobj_please_enter_valid_value_for_discount,pattern_cp: errorobj_please_enter_only_numeric,maxlength: errorobj_please_enter_maximum_2_digits}
  });
  if (!jQuery("#freq_discount_formadd").valid()) { jQuery(".ct-loading-main").hide(); return false; }
  jQuery.ajax({
    type: "post",
    data: { name: name, label: label, days: days, types: types, values: values, addrecurrence: 1 },
    url: ajax_url + "setting_ajax.php",
    success: function (res) {
      if(res == "1"){
        location.reload();
      }else{
        jQuery(".ct-loading-main").hide();
      }
    }
  });
});
/* Update details */
jQuery(document).on("click",".btnupdaterecurrence_once",function(){
  jQuery(".ct-loading-main").show();
  var id = jQuery(this).attr("data-id");
  var name  = jQuery("#txtfreqname"+id).val();
  var label  = jQuery("#txtfreqlabel"+id).val();
  jQuery("#freq_discount_form"+id).validate();
  jQuery("#txtfreqname" + id).rules("add",{
    required: true,
    messages: {required: errorobj_please_enter_name}
  });
  jQuery("#txtfreqlabel" + id).rules("add",{
    required: true,
    messages: {required: errorobj_please_enter_title}
  });
  if (!jQuery("#freq_discount_form"+id).valid()) { jQuery(".ct-loading-main").hide(); return false; }
  jQuery.ajax({
    type: "post",
    data: {
      id: id,
      name: name,
      label: label,
      updaterecurrence_once: 1
    },
    url: ajax_url + "setting_ajax.php",
    success: function (res) {
      if(res == "1"){
        location.reload();
      }else{
        jQuery(".ct-loading-main").hide();
      }
    }
  });
});
jQuery(document).on("click",".btnupdaterecurrence",function(){
  jQuery(".ct-loading-main").show();
  var id = jQuery(this).attr("data-id");
  var name  = jQuery("#txtfreqname"+id).val();
  var label  = jQuery("#txtfreqlabel"+id).val();
  var days  = jQuery("#txtfreqdaysid"+id).val();
  var types  = jQuery("#txtfreqtype"+id).val();
  var values  = jQuery("#txtfreqvalueid"+id).val();
  jQuery("#freq_discount_form"+id).validate();
  jQuery("#txtfreqname" + id).rules("add",{
    required: true,
    messages: {required: errorobj_please_enter_name}
  });
  jQuery("#txtfreqvalueid" + id).rules("add",{
    required: true,pattern_price : true,
    messages: {required: errorobj_please_enter_valid_value_for_discount,pattern_price: errorobj_please_enter_valid_value_for_discount}
  });
  jQuery("#txtfreqlabel" + id).rules("add",{
    required: true,
    messages: {required: errorobj_please_enter_title}
  });
  jQuery("#txtfreqdaysid" + id).rules("add",{
    required: true,pattern_cp : true,maxlength: 2,
    messages: {required: errorobj_please_enter_valid_value_for_discount,pattern_cp: errorobj_please_enter_only_numeric,maxlength: errorobj_please_enter_maximum_2_digits}
  });
  if (!jQuery("#freq_discount_form"+id).valid()){  jQuery(".ct-loading-main").hide(); return false; }
  jQuery.ajax({
    type: "post",
    data: { id: id, name: name, label: label, days: days, types: types, values: values, updaterecurrence: 1 },
    url: ajax_url + "setting_ajax.php",
    success: function (res) {
      if(res == "1"){
        location.reload();
      }else{
        jQuery(".ct-loading-main").hide();
      }
    }
  });
});
/* Delete reccurence details */
jQuery(document).on("click",".reccurence-delete-button",function(){
  jQuery(".ct-loading-main").show();
  var id = jQuery(this).attr("data-reccurence_id");
  jQuery.ajax({
    type: "post",
    data: { id: id, deleterecurrence: 1 },
    url: ajax_url + "setting_ajax.php",
    success: function (res) {
      if(res == "1"){
        location.reload();
      }else{
        jQuery(".ct-loading-main").hide();
      }
    }
  });
});
jQuery(document).on("click",".send_inovoice",function () {
  jQuery(".ct-loading-main").show();
  var email = jQuery(this).attr("data-email");
  var name = jQuery(this).attr("data-name");
  var links = jQuery(this).attr("data-link");
  var datastring = { "email" : email, "name" : name, "link" : links, "send_email_invoice" : 1 }
  jQuery.ajax({
    type: "post",
    data: datastring,
    url: ajax_url + "setting_ajax.php",
    success: function (res) {
			
      jQuery(".ct-loading-main").hide();
    }
  });
});
jQuery(document).on("click", ".save_seo_ga", function () {
  jQuery(".ct-loading-main").show();
  jQuery("#ct-seo-ga-settings").submit();
});
jQuery(document).on("submit", "#ct-seo-ga-settings", function (e) {
  e.preventDefault();
  jQuery.ajax({
    url: ajax_url + "setting_ajax.php",
    type: "POST",
    data: new FormData(this), 
    contentType: false,
    cache: false,
    processData:false,
    success: function(res) {
      if(jQuery.trim(res) == "Invalid Image Type"){
        jQuery(".mainheader_message_fail").show();
        jQuery(".mainheader_message_inner_fail").css("display", "inline");
        jQuery("#ct_sucess_message_fail").text(errorobj_Invalid_Image_Type);
        jQuery(".mainheader_message_fail").fadeOut(5000);
        jQuery(".ct-loading-main").hide();
      } else{
        jQuery(".mainheader_message").show();
        jQuery(".mainheader_message_inner").css("display", "inline");
        jQuery("#ct_sucess_message").text(errorobj_seo_settings_updated_successfully);
        jQuery(".mainheader_message").fadeOut(5000);
        jQuery(".ct-loading-main").hide();
      }
    }
  });
});
function ct_gif_loader_preview(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function (e) {
      jQuery("#ct_upload_gif_loader_preview").show();
      jQuery("#ct_upload_gif_loader_preview").attr("src", e.target.result);
    }
    reader.readAsDataURL(input.files[0]);
  }
}
jQuery(document).on("change", ".ct_frontend_gif_loader_file", function () {
  ct_gif_loader_preview(this);
});
jQuery(document).on("click", "#ct_gifloader", function () {
  jQuery(".ct_CSS_Loader_div").hide();
  jQuery(".ct_GIF_Loader_div").show();
});
jQuery(document).on("click", "#ct_defaultloader", function () {
  jQuery(".ct_CSS_Loader_div").hide();
  jQuery(".ct_GIF_Loader_div").hide();
});
jQuery(document).on("click", "#ct_cssloader", function () {
  jQuery(".ct_CSS_Loader_div").show();
  jQuery(".ct_GIF_Loader_div").hide();
});
jQuery(document).on("focusout", "#ct_custom_css_loader", function () {
  var t_val = jQuery(this).val();
  if(t_val != ""){
    jQuery(".ct_custom_css_loader_preview_overlay").html(t_val);
    jQuery(".ct_custom_css_loader_preview_overlay").show();
  }else{
    jQuery(".ct_custom_css_loader_preview_overlay").html("");
    jQuery(".ct_custom_css_loader_preview_overlay").hide();
  }
});
jQuery(document).ready( function () {
  if(jQuery("#ct_gifloader").prop("checked")){
    jQuery(".ct_CSS_Loader_div").hide();
    jQuery(".ct_GIF_Loader_div").show();
  }else if(jQuery("#ct_cssloader").prop("checked")){
    jQuery(".ct_CSS_Loader_div").show();
    jQuery(".ct_GIF_Loader_div").hide();
  }else{
    jQuery(".ct_CSS_Loader_div").hide();
    jQuery(".ct_GIF_Loader_div").hide();
  }
  if(jQuery("#ct_custom_css_loader").val() == ""){
    jQuery(".ct_custom_css_loader_preview_overlay").html("");
    jQuery(".ct_custom_css_loader_preview_overlay").hide();
  }
});
/***  auto updater ***/
jQuery(document).on("click",".pulse-update",function(e){
  jQuery(".modal-backdrop").hide();
});
jQuery(document).on("click","#ct_update_available",function(e){
  jQuery(".ct-loading-main").show();
  e.preventDefault();
  jQuery.ajax({
    type:"POST",
    url: ajax_url +"ct_auto_updater_ajax.php",
    data:{action:"auto_updater"},
    success:function(res){
      if(jQuery.trim(res) == "Not installed - ZipArchive is required for importing content. Please contact your server administrator and ask them to enable it."){
        jQuery(".mainheader_message_fail_upgrade").show();
        jQuery(".mainheader_message_inner_fail_upgrade").css("display", "inline");
        jQuery("#ct_sucess_message_fail_upgrade").text("Not installed - ZipArchive is required for importing content. Please contact your server administrator and ask them to enable it.");
        jQuery(".mainheader_message_fail_upgrade").fadeOut(20000);
        jQuery(".ct-loading-main").hide();
      }else{
        window.location.reload();
      }
    }
  });
});
/*** auto updater  ***/
/***  Add extensions ***/
jQuery(document).on("click",".ct_add_extensions",function(e){
  jQuery(".ct-loading-main").show();
  e.preventDefault();
  var installed_version = jQuery(this).attr("data-installed_version");
  var update_version = jQuery(this).attr("data-update_version");
  var extension = jQuery(this).attr("data-extension");
  var purchase_option = jQuery(this).attr("data-purchase_option");
  var version_option = jQuery(this).attr("data-version_option");
  var redirect_to = jQuery(this).attr("data-redirect_to");
  var payment_option = jQuery(this).attr("data-option");
  var payment_add_option = jQuery(this).attr("data-add_option");
  var payment_add_lable = jQuery(this).attr("data-add_lable");
  jQuery.ajax({
    type:"POST",
    url: ajax_url +"ct_add_extensions_ajax.php",
    data:{installed_version:installed_version, update_version:update_version, extension:extension, purchase_option:purchase_option, version_option:version_option, payment_option:payment_option, payment_add_option:payment_add_option, payment_add_lable:payment_add_lable, action:"add_extension"},
    success:function(res){
      if(jQuery.trim(res) == "Not installed - ZipArchive is required for importing content. Please contact your server administrator and ask them to enable it."){
        jQuery(".mainheader_message_fail_upgrade").show();
        jQuery(".mainheader_message_inner_fail_upgrade").css("display", "inline");
        jQuery("#ct_sucess_message_fail_upgrade").text("Not installed - ZipArchive is required for importing content. Please contact your server administrator and ask them to enable it.");
        jQuery(".mainheader_message_fail_upgrade").fadeOut(20000);
        jQuery(".ct-loading-main").hide();
      }else{
        if(redirect_to != ""){
          window.location.href = site_ur.site_url+redirect_to;
        }else{
          window.location.reload();
        }
      }
    }
  });
});
jQuery(document).on("click",".ct_activate_extensions",function(e){
  jQuery(".ct-loading-main").show();
  e.preventDefault();
  jQuery(".purchase_code_err_"+extension).css("cssText", "display: none !important;");
  var installed_version = jQuery(this).attr("data-installed_version");
  var update_version = jQuery(this).attr("data-update_version");
  var extension = jQuery(this).attr("data-extension");
  var purchase_option = jQuery(this).attr("data-purchase_option");
  var version_option = jQuery(this).attr("data-version_option");
  var redirect_to = jQuery(this).attr("data-redirect_to");
  var purchase_code = jQuery(".verify_purchase_code_value_"+extension).val();
  var payment_option = jQuery(this).attr("data-option");
  var payment_add_option = jQuery(this).attr("data-add_option");
  var payment_add_lable = jQuery(this).attr("data-add_lable");
  if(purchase_code != ""){
    jQuery.ajax({
      type:"POST",
      url: ajax_url +"ct_add_extensions_ajax.php",
      data:{purchase_code:purchase_code, version_option:version_option, payment_option:payment_option, payment_add_option:payment_add_option, payment_add_lable:payment_add_lable, extension:extension, action:"verify_purchase_code"},
      success:function(res){
        if(jQuery.trim(res) == "Not installed - ZipArchive is required for importing content. Please contact your server administrator and ask them to enable it."){
          jQuery(".mainheader_message_fail_upgrade").show();
          jQuery(".mainheader_message_inner_fail_upgrade").css("display", "inline");
          jQuery("#ct_sucess_message_fail_upgrade").text("Not installed - ZipArchive is required for importing content. Please contact your server administrator and ask them to enable it.");
          jQuery(".mainheader_message_fail_upgrade").fadeOut(20000);
          jQuery(".ct-loading-main").hide();
        }else if(jQuery.trim(res) == "valid" || jQuery.trim(res) == "verified"){
          jQuery(".purchase_code_err_"+extension).css("cssText", "display: none !important;");
          jQuery.ajax({
            type:"POST",
            url: ajax_url +"ct_add_extensions_ajax.php",
            data:{installed_version:installed_version, update_version:update_version, extension:extension, purchase_option:purchase_option, version_option:version_option, payment_option:payment_option, payment_add_option:payment_add_option, payment_add_lable:payment_add_lable, action:"activate_extension"},
            success:function(res){
              if(redirect_to != ""){
                window.location.href = site_ur.site_url+redirect_to;
              }else{
                window.location.reload();
              }
            }
          });
        }else{
          jQuery(".purchase_code_err_"+extension).css("cssText", "display: block !important;");
          jQuery(".purchase_code_err_"+extension).show();
          jQuery(".purchase_code_err_"+extension).html("Please enter valid purchase code");
          jQuery(".ct-loading-main").hide();
        }
      }
    });
  }else{
    jQuery(".purchase_code_err_"+extension).css("cssText", "display: block !important;");
    jQuery(".purchase_code_err_"+extension).show();
    jQuery(".purchase_code_err_"+extension).html("Please enter purchase code");
    jQuery(".ct-loading-main").hide();
  }
});
jQuery(document).on("click",".ct_activate_extensions_zip",function(e){
  jQuery(".ct-loading-main").show();
  e.preventDefault();
  jQuery(".purchase_code_err_"+extension).css("cssText", "display: none !important;");
  var installed_version = jQuery(this).attr("data-installed_version");
  var update_version = jQuery(this).attr("data-update_version");
  var extension = jQuery(this).attr("data-extension");
  var purchase_option = jQuery(this).attr("data-purchase_option");
  var version_option = jQuery(this).attr("data-version_option");
  var redirect_to = jQuery(this).attr("data-redirect_to");
  var purchase_code = jQuery(".verify_purchase_code_value_"+extension).val();
  var payment_option = jQuery(this).attr("data-option");
  var payment_add_option = jQuery(this).attr("data-add_option");
  var payment_add_lable = jQuery(this).attr("data-add_lable");
  if(purchase_code != ""){
    jQuery.ajax({
      type:"POST",
      url: ajax_url +"ct_add_extensions_ajax.php",
      data:{purchase_code:purchase_code, version_option:version_option, payment_option:payment_option, payment_add_option:payment_add_option, payment_add_lable:payment_add_lable, extension:extension, action:"verify_purchase_code"},
      success:function(res){
        if(jQuery.trim(res) == "Not installed - ZipArchive is required for importing content. Please contact your server administrator and ask them to enable it."){
          jQuery(".mainheader_message_fail_upgrade").show();
          jQuery(".mainheader_message_inner_fail_upgrade").css("display", "inline");
          jQuery("#ct_sucess_message_fail_upgrade").text("Not installed - ZipArchive is required for importing content. Please contact your server administrator and ask them to enable it.");
          jQuery(".mainheader_message_fail_upgrade").fadeOut(20000);
          jQuery(".ct-loading-main").hide();
        }else if(jQuery.trim(res) == "valid" || jQuery.trim(res) == "verified"){
          jQuery(".purchase_code_err_"+extension).css("cssText", "display: none !important;");
          jQuery.ajax({
            type:"POST",
            url: ajax_url +"ct_add_extensions_ajax.php",
            data:{installed_version:installed_version, update_version:update_version, extension:extension, purchase_option:purchase_option, version_option:version_option, payment_option:payment_option, payment_add_option:payment_add_option, payment_add_lable:payment_add_lable, action:"activate_extensions_zip"},
            success:function(res){
              if(jQuery.trim(res) == "Not installed - ZipArchive is required for importing content. Please contact your server administrator and ask them to enable it."){
                jQuery(".mainheader_message_fail_upgrade").show();
                jQuery(".mainheader_message_inner_fail_upgrade").css("display", "inline");
                jQuery("#ct_sucess_message_fail_upgrade").text("Not installed - ZipArchive is required for importing content. Please contact your server administrator and ask them to enable it.");
                jQuery(".mainheader_message_fail_upgrade").fadeOut(20000);
                jQuery(".ct-loading-main").hide();
              }else{
                if(redirect_to != ""){
                  window.location.href = site_ur.site_url+redirect_to;
                }else{
                  window.location.reload();
                }
              }
            }
          });
        }else{
          jQuery(".purchase_code_err_"+extension).css("cssText", "display: block !important;");
          jQuery(".purchase_code_err_"+extension).show();
          jQuery(".purchase_code_err_"+extension).html("Please enter valid purchase code");
          jQuery(".ct-loading-main").hide();
        }
      }
    });
  }else{
    jQuery(".purchase_code_err_"+extension).css("cssText", "display: block !important;");
    jQuery(".purchase_code_err_"+extension).show();
    jQuery(".purchase_code_err_"+extension).html("Please enter purchase code");
    jQuery(".ct-loading-main").hide();
  }
});
jQuery(document).on("click",".ct_uninstall_extension",function(e){
  e.preventDefault();
  jQuery(".ct-loading-main").show();
  var installed_version = jQuery(this).attr("data-installed_version");
  var update_version = jQuery(this).attr("data-update_version");
  var extension = jQuery(this).attr("data-extension");
  var purchase_option = jQuery(this).attr("data-purchase_option");
  var version_option = jQuery(this).attr("data-version_option");
  jQuery.ajax({
    type:"POST",
    url: ajax_url +"ct_remove_extensions_ajax.php",
    data:{installed_version:installed_version, update_version:update_version, extension:extension, purchase_option:purchase_option, version_option:version_option, action:"uninstall_extension"},
    success:function(res){
      if(jQuery.trim(res) == "Not installed - ZipArchive is required for importing content. Please contact your server administrator and ask them to enable it."){
        jQuery(".mainheader_message_fail_upgrade").show();
        jQuery(".mainheader_message_inner_fail_upgrade").css("display", "inline");
        jQuery("#ct_sucess_message_fail_upgrade").text("Not installed - ZipArchive is required for importing content. Please contact your server administrator and ask them to enable it.");
        jQuery(".mainheader_message_fail_upgrade").fadeOut(20000);
        jQuery(".ct-loading-main").hide();
      }else{
        window.location.reload();
      }
    }
  });
});
jQuery(document).on("click",".ct_deactivate_extension",function(e){
  e.preventDefault();
  jQuery(".ct-loading-main").show();
  var installed_version = jQuery(this).attr("data-installed_version");
  var update_version = jQuery(this).attr("data-update_version");
  var extension = jQuery(this).attr("data-extension");
  var purchase_option = jQuery(this).attr("data-purchase_option");
  var version_option = jQuery(this).attr("data-version_option");
  jQuery.ajax({
    type:"POST",
    url: ajax_url +"ct_remove_extensions_ajax.php",
    data:{installed_version:installed_version, update_version:update_version, extension:extension, purchase_option:purchase_option, version_option:version_option, action:"deactivate_extension"},
    success:function(res){
      if(jQuery.trim(res) == "Not installed - ZipArchive is required for importing content. Please contact your server administrator and ask them to enable it."){
        jQuery(".mainheader_message_fail_upgrade").show();
        jQuery(".mainheader_message_inner_fail_upgrade").css("display", "inline");
        jQuery("#ct_sucess_message_fail_upgrade").text("Not installed - ZipArchive is required for importing content. Please contact your server administrator and ask them to enable it.");
        jQuery(".mainheader_message_fail_upgrade").fadeOut(20000);
        jQuery(".ct-loading-main").hide();
      }else{
        window.location.reload();
      }
    }
  });
});
/* Reschedule Appointment */
jQuery(document).on("click","#ct-reschedual-appointment",function(e){
  e.preventDefault();
  jQuery(".ct-loading-main").show();
  var order_id=jQuery(this).attr("data-id");
  jQuery.ajax({
    type:"POST",
    url: ajax_url +"my_appoint_ajax.php",
    data:{"order_id":order_id,"reschedual_booking_admin":"yes"},
    success:function(res){
      jQuery(".ct-loading-main").hide();
      jQuery("#myModal_reschedual").html(res);
      jQuery("#myModal_reschedual").modal("show");
    }
  });
});
/* Edit Appointment */
jQuery(document).on("click","#edit_reschedual",function(e){
  //jQuery(".ct-loading-main").show();
  if(check_update_if_btn == "0"){
    check_update_if_btn = "1"; 
    e.preventDefault();
    var order = jQuery(this).attr("data-order");
    var notes = jQuery("#rs_notes").val();
    var dates = jQuery("#expiry_date"+order).val();
    var extension_js = jQuery("#extension_js").val();
    if(extension_js == "true") {
      var gc_event_id = jQuery(this).attr("data-gc_event");
      var gc_staff_event_id = jQuery(this).attr("data-gc_staff_event");
      var pid = jQuery(this).attr("data-pid");
    } else {
      var gc_event_id = "";
      var gc_staff_event_id = "";
      var pid = "";
    }
    var times1 = "";
    if(localStorage.getItem("time1") != ""){
      times1 =  localStorage.getItem("time1");
    }
    if(times1 == ""){
      check_update_if_btn = "0";
      jQuery(".close").trigger("click");
      jQuery(".mainheader_message_fail").show();
      jQuery(".mainheader_message_inner_fail").css("display", "inline");
      jQuery("#ct_sucess_message_fail").text(errorobj_sorry_we_are_not_available);
      jQuery(".mainheader_message_fail").fadeOut(3000);
    } else {
      jQuery.ajax({
        type : "post",
        data : { orderid : order, notes : notes, dates : dates, timess : times1, gc_event_id : gc_event_id, gc_staff_event_id : gc_staff_event_id, pid : pid, user : "admin", reschedulebooking : 1 },
        url : ajax_url+"user_details_ajax.php",
        success : function(res){
          if(parseInt(jQuery.trim(res))==1) {
            jQuery(".close").trigger("click"); 
            jQuery(".mainheader_message").show();
            jQuery(".mainheader_message_inner").css("display", "inline");
            jQuery("#ct_sucess_message").text(errorobj_appointment_reschedules_successfully);
            jQuery(".mainheader_message").fadeOut(3000);
            location.reload();
          } else {
            check_update_if_btn = "0";
            jQuery(".close").trigger("click");
            jQuery(".mainheader_message_fail").show();
            jQuery(".mainheader_message_inner_fail").css("display", "inline");
            jQuery("#ct_sucess_message_fail").text(errorobj_sorry_we_are_not_available);
            jQuery(".mainheader_message_fail").fadeOut(3000);
          }
        }
      });
    }
  }
});
jQuery(document).on("change", ".myservices_methods_one_status", function (event) {
  if (jQuery(this).prop("checked") == true) {
    jQuery(".ct-loading-main").show();
    var id = jQuery(this).attr("data-id");
    jQuery.ajax({
      type: "post",
      data: { id: id, changesinfotatus: "E" },
      url: ajax_url + "service_method_units_ajax.php",
      success: function (res) {
        jQuery(".ct-loading-main").hide();
        jQuery(".mainheader_message_inner").css("display","inline");
        jQuery("#ct_sucess_message").html(errorobj_units_status_updated);
        jQuery(".mainheader_message").show();
        jQuery(".mainheader_message").fadeOut(5000);
      }
    });
    event.preventDefault();
  } else {
    jQuery(".ct-loading-main").show();
    var id = jQuery(this).attr("data-id");
    jQuery.ajax({
      type: "post",
      data: { id: id, changesinfotatus: "D" },
      url: ajax_url + "service_method_units_ajax.php",
      success: function (res) {
        jQuery(".ct-loading-main").hide();
        jQuery(".mainheader_message_inner").css("display","inline");
        jQuery("#ct_sucess_message").html(errorobj_units_status_updated);
        jQuery(".mainheader_message").show();
        jQuery(".mainheader_message").fadeOut(5000);
        location.reload();
      }
    });
    event.preventDefault(); 
  }
});
/* Email Send Code */
jQuery(document).on("click","#eml_sub_add",function(){
  var cusids = jQuery("#idsdata").val();
  var cussub = jQuery("#email_sub").val();
  var cusmsg = jQuery("#email_msg").val();
  var cusimg = "";
  if(cusids == "[]" || cusids == ""){
    jQuery(".eml_errors").html("Please Select Customers First.").show();
    jQuery(".cls").click();
    jQuery(".item-search").focus();
    return;
  } else if(cussub == ""){
    jQuery("#email_sub").focus();
    jQuery(".eml_errors").html("Please Fill All The details.").show();
    return;
  } else if(cusmsg == ""){
    CKEDITOR.instances["email_msg"].focus();
    jQuery(".eml_errors").html(errorobj_please_enter_email_message).show();
    return;
  }else{
    jQuery(".eml_errors").html(errorob_please_wait_while_we_send_all_your_message).show();
  }
  var emlformdata = new FormData();
  if(jQuery("#files-input-upload").get(0).files.length === 0) {}else{
    var file_data = jQuery("#files-input-upload").prop("files")[0];
    emlformdata.append("image", file_data);
  }
  emlformdata.append("cusids", cusids);
  emlformdata.append("cussub", cussub);
  emlformdata.append("cusmsg", cusmsg);
  emlformdata.append("emlsend", 1);
  jQuery.ajax({
    url: ajax_url + "eml_sms_ajax.php",
    type: "POST",
    data: emlformdata,
    cache: false,
    contentType: false,
    processData: false,
    success: function (data) {
      if(data == "No"){
        jQuery(".eml_errors").html(errorobj_please_enable_email_to_client).show();
        return;
      }else if(data == "done"){
        window.location.reload();
      }
    }
  });
});
/* sms code */
jQuery(document).on("click","#sms_sub_add",function(){
  var cusids = jQuery("#idsdata").val();
  var cusmsg = jQuery("#sms_msg").val();
  var cusimg = "";
  if(cusids == "[]" || cusids == ""){
    jQuery(".sms_errors").html("Please Select Customers First.").show();
    jQuery(".cls").click();
    jQuery(".item-search").focus();
    return;
  } else if(cusmsg == ""){
    jQuery("#sms_msg").focus();
    jQuery(".sms_errors").html(errorobj_please_enter_sms_message).show();
    return;
  }else{
    jQuery(".sms_errors").html(errorob_please_wait_while_we_send_all_your_message).show();
  }
  var emlformdata = new FormData();
  emlformdata.append("cusids", cusids);
  emlformdata.append("cusmsg", cusmsg);
  emlformdata.append("smssend", 1);
  jQuery.ajax({
    url: ajax_url + "eml_sms_ajax.php",
    type: "POST",
    data: emlformdata,
    cache: false,
    contentType: false,
    processData: false,
    success: function (data) {
      if(data == "No"){
        jQuery(".sms_errors").html(errorobj_please_enable_sms_gateway).show();
        return;
      }else if(data == "Noo"){
        jQuery(".sms_errors").html(errorobj_please_enable_client_notification).show();
        return;
      }else if(data == "done"){
        window.location.reload();
      }
    }
  });
});
/* input type file change event with check data  */
jQuery(document).on("change", "#files-input-upload", function (e) {
  var uploadsection = jQuery(this).attr("id");
  var oFile = jQuery("#" + uploadsection)[0].files[0];
  var file = this.files[0];
  var fileType = file["type"];
  var ValidImageTypes = ["image/jpeg", "image/png", "image/gif", "application/zip", "application/pdf"];
  if (jQuery.inArray(fileType, ValidImageTypes) < 0) {
    jQuery(".eml_errors").html(errorobj_only_jpeg_png_gif_zip_and_pdf_allowed);
    jQuery("#files-input-upload").val("");
    jQuery("#fake-file-input-name").val("");
    return;
  }
  var file_size = jQuery(this)[0].files[0].size;
  var maxfilesize = 1048576 * 2;
  if (file_size >= maxfilesize) {
    jQuery(".eml_errors").html(errorobj_maximum_file_upload_size_2_mb);
    jQuery("#files-input-upload").val("");
    jQuery("#fake-file-input-name").val("");
    return;
  }
  var file_size = jQuery(this)[0].files[0].size;
  var minfilesize = 1048576 * 0.0005;
  if (file_size <= minfilesize) {
    jQuery(".eml_errors").html(errorobj_minimum_file_upload_size_1_kb);
    jQuery("#files-input-upload").val("");
    jQuery("#fake-file-input-name").val("");
    return;
  }
  jQuery(".eml_errors").html("");
});
/* Customer Add Code */
jQuery(document).on("click", "#new_cus_add_admin", function (e) {
  var admin_cus_email = jQuery("#admin_cus_email").val();
  var admin_cus_pwd = jQuery("#admin_cus_pwd").val();
  var admin_cus_fstnm = jQuery("#admin_cus_fstnm").val();
  var admin_cus_lstnm = jQuery("#admin_cus_lstnm").val();
  var country_code = jQuery(".selected-flag").attr("title");
  var cod=country_code.substring(country_code.indexOf("+"));
  var phno = jQuery("#admin_cus_phno").val();
  var admin_cus_phno = cod.concat(phno);
  var admin_cus_str_addr = jQuery("#admin_cus_str_addr").val();
  var admin_cus_zipcode = jQuery("#admin_cus_zipcode").val();
  var admin_cus_city = jQuery("#admin_cus_city").val();
  var admin_cus_state = jQuery("#admin_cus_state").val();
  var admin_cus_note = jQuery("#admin_cus_note").val();
  jQuery.validator.addMethod("lettersonly", function(value, element) {
    return this.optional(element) || /^[a-zA-Z\s]+$/.test(value);
  });
  jQuery(".add_new_user_add").validate({
  rules: { 
      admin_cus_email: {
        required: true,
        email: true,
        remote: {
          url:ajax_url+"eml_sms_ajax.php",
          type: "POST",
          async:false,
          data: {
            email: function(){ return jQuery("#admin_cus_email").val(); },
            action:"check_admin_cus_email"
          }
        },
      },  
      admin_cus_pwd: {
        required: true,
        minlength: 8,
      }, 
      admin_cus_fstnm: {
        required: true,
        lettersonly: true,
      }, 
      admin_cus_lstnm: {
        required: true,
        lettersonly: true,
      }, 
      admin_cus_phno: {
        required: true,
        number: true,
        minlength: 6,
      }, 
      admin_cus_str_addr: {
        required: true,
      }, 
      admin_cus_zipcode: {
        required: true,
      },
      admin_cus_city: {
        required: true,
        lettersonly: true,
      },
      admin_cus_state: {
        required: true,
        lettersonly: true,
      },
    },      
    messages:{ 
      admin_cus_email: {
        required: errorobj_please_enter_email,
        email: errorobj_please_enter_valid_email_address,
        remote: errorobj_email_already_exists,
      },
      admin_cus_pwd: {
        required: errorobj_please_enter_password,
        minlength: errorobj_password_must_be_8_character_long,
      },
      admin_cus_fstnm: {
        required: errorobj_please_enter_firstname,
        lettersonly: errorobj_enter_only_alphabets,
      },
      admin_cus_lstnm: {
        required: errorobj_please_enter_lastname,
        lettersonly: errorobj_enter_only_alphabets,
      },
      admin_cus_phno: {
        required: errorobj_please_enter_phone_number,
        number: errorobj_enter_only_digits,
        minlength: errorobj_please_enter_phone_number,
      },
      admin_cus_str_addr: {
        required: errorobj_please_enter_address,
      },
      admin_cus_zipcode: {
        required: errorobj_please_enter_zipcode,
      },
      admin_cus_city: {
        required: errorobj_please_enter_city,
        lettersonly: errorobj_enter_only_alphabets,
      },
      admin_cus_state: {
        required: errorobj_please_enter_state,
        lettersonly: errorobj_enter_only_alphabets,
      },
    },
  });
  if(jQuery(".add_new_user_add").valid()){
    jQuery.ajax({
      type:"POST",
      url: ajax_url +"user_details_ajax.php",
      data:{insert_crm_user_detail:1,admin_cus_email:admin_cus_email,admin_cus_pwd:admin_cus_pwd,admin_cus_fstnm:admin_cus_fstnm,admin_cus_lstnm:admin_cus_lstnm,admin_cus_phno:admin_cus_phno,admin_cus_str_addr:admin_cus_str_addr,admin_cus_zipcode:admin_cus_zipcode,admin_cus_city:admin_cus_city,admin_cus_state:admin_cus_state,admin_cus_note:admin_cus_note},
      success:function(res){
        if(res == "NoData"){
          jQuery(".fltr_error_show").html("No Records Available Please Try Again").show();
          jQuery("#add_new_email_sms").hide();
          return;
        }else{
          window.location.reload();
        }
      }
    });
  }
});
const multiSelect = {
  el: "#app",
  data () {
    return {
      searchTerm: "",
      searchTermWidth: "",
      lastTerm: "",
      suggestList: prodata,
      selectedList: [],
    idList: proids,
      idselectList: [],
      activeVertical: 0,
      activeHorizontal: -1,
      showSuggestPanel: false,
      hasFocus: false
    }
  },
  computed: {
    sanitizedTerm () {
      return this.searchTerm.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
    },
    filteredSuggest () {
      if (!this.searchTerm) return this.suggestList
      
      const ex = RegExp(this.sanitizedTerm, "i")
      const filtered = this.suggestList.filter(ele => ex.test(ele))
      const label = `<strong><sup>+</sup> ${this.searchTerm}</strong>`
      return filtered.length ? filtered : [{ label, value: this.searchTerm }]
    }
  },
  watch: {
    value (newList) {
      this.selectedList = newList
    },
    list (newList) {
      this.suggestList = newList
    },
    filteredSuggest (newList) {
      this.activeVertical = 0
    },
    searchTerm (newTerm) {
      this.$nextTick().then(() => this.calcTextWidth())
    },
    selectedList (newList) {
      this.$emit("input", newList)
    }
  },
  methods: {
    addSelected (val) {
      if (this.selectedList.includes(val)){
      var inx=this.selectedList.indexOf(val);
      if(inx != "-1"){
        this.selectedList.splice(inx, 1)
        this.idselectList.splice(inx, 1)
        jQuery("#idsdata").val(JSON.stringify(this.idselectList));
      }
      return
    }     
    if(this.suggestList.includes(val)){
      this.selectedList.push(val)
      var inx=this.suggestList.indexOf(val);
      var idvl=this.idList[inx];
      this.idselectList.push(idvl)
      jQuery("#idsdata").val(JSON.stringify(this.idselectList));
        this.searchTerm = ""
        this.activeHorizontal = -1
    }
    },
    addActive () {
      const value = this.filteredSuggest[this.activeVertical]
      if (value && this.showSuggestPanel) this.addSelected(value.value || value)
    },
  rmnseldt(){
    while(this.selectedList.length > 0) {
      this.backspaceDelete();
    }
  },
    removeSelected (index) {
      this.selectedList.splice(index, 1)
    this.idselectList.splice(index, 1)
    jQuery("#idsdata").val(JSON.stringify(this.idselectList));
    },
    traverseList (direction) {
      if (direction === "next" && !this.showSuggestPanel) {
        this.activeVertical = -1
      }
      
      const lastIndex = this.filteredSuggest.length - 1
      let newIndex = direction === "next" ? 
          this.activeVertical + 1 :
          this.activeVertical - 1
      
      if (newIndex <= lastIndex && newIndex >= 0) {
        this.activeVertical = newIndex
      }
      
      this.scrollToView()
    },
    traverseSelected (direction) {
      const lastIndex = this.selectedList.length - 1

      if (this.activeHorizontal == -1) {
        this.activeHorizontal = lastIndex + 1
      } 

      let newIndex = direction === "left" ? 
            this.activeHorizontal - 1 :
            this.activeHorizontal + 1 

      if (newIndex == this.selectedList.length) {
        this.activeHorizontal = -1
        return
      }
      
      if (newIndex <= lastIndex && newIndex >= 0) {
        this.activeHorizontal = newIndex
      }
    },
    traverseSelectedDelete () {
      if (this.activeHorizontal === -1) return
      this.removeSelected(this.activeHorizontal)
    },
    backspaceDelete () {
      if (this.activeHorizontal !== -1) return
      if (!this.selectedList.length) return
      if (this.lastTerm) return

      const lastIndex = this.selectedList.length - 1
      if (lastIndex !== -1) this.removeSelected (lastIndex)
    },
    scrollToView () {
      if (!this.showSuggestPanel) return

      this.$nextTick().then(() => {
        const container = this.$refs.panel
        const item = this.$el.querySelector(".suggest-item.active")
        
        const sy1 = container.scrollTop
        const sy2 = container.offsetHeight + sy1
        
        const ty1 = item.offsetTop
        const th = item.offsetHeight
        const ty2 = th + ty1
        
        if (ty1 <= sy2 && sy2 < ty2) {
          this.$refs.panel.scrollTop = (sy1 + (ty1 - sy2)) + th
        } else if (ty1 < sy1 && sy1 <= ty2) {
          this.$refs.panel.scrollTop = (sy1 + (ty2 - sy1)) - th
        }
      })
    },
    calcTextWidth () {
      const textWidth = this.$refs.tester.clientWidth
      const finalWidth = textWidth ? textWidth + 10 : 50
      this.searchTermWidth = `${finalWidth}px`
    },
    hightlightWord (val) {
      if (val.label) return val.label
      if (!this.searchTerm) return val

      const termRegex = RegExp(`(${this.sanitizedTerm})`, "i")
      return val.replace(termRegex, (m, t) => `<span class="highlight">${t}</span>`)
    }
  }
}
/* datatable for ajax loading for customers */
jQuery(document).ready(function () {
  jQuery("#post_list").DataTable({
    "dom": "lfrtipB",
    "lengthMenu": [[10, 25, 50, 9999999999], [10, 25, 50, "All"]],
    "buttons": [{
      extend: "copyHtml5",
      exportOptions: {
        columns: [ 0, 1 ,2 ,3 ,4 ,5 ,6 ]
      }
      },{
      extend: "csvHtml5",
      exportOptions: {
        columns: [ 0, 1 ,2 ,3 ,4 ,5 ,6 ]
      }
      },{
      extend: "excelHtml5",
      exportOptions: {
        columns: [ 0, 1 ,2 ,3 ,4 ,5 ,6 ]
      }
      },{
      extend: "pdfHtml5",
      exportOptions: {
        columns: [ 0, 1 ,2 ,3 ,4 ,5 ,6 ]
      }
      },],
    "bProcessing": true,
    "serverSide": true,
    "order": [0, "desc"],
    "ajax":{
      url :"post_list.php",
      type: "POST",
      error: function(data){
        jQuery("#post_list_processing").css("display","block");
      },
      "data": function (data) {
        passdata = [];
      }
    },
    "columns": [
      { "data": null,
        "render": function (data, type, row) {
          var nm=data.first_name+" "+data.last_name;
          adddatapush(nm);
          return nm;
        }
      },
      { "data": "user_email" },
      { "data": "phone" },
      { "data": "zip" },
      { "data": "city" },
      { "data": "state" },
      { "data": "cus_dt" },
      { "data": null,
        "render": function (data, type, row) {
          var rtndt='<a class="btn btn-primary " data-id="'+data["id"]+'" href="edit_customer_detail.php?id='+data["id"]+'"><i class="fa fa-edit"></i></a><a data-id="'+data["id"]+'" class="btn btn-danger col-sm-offset-1 delete_new_customer" data-toggle="modal" data-target="#delete_new_customer" title="Delete this customer?"><i class="fa fa-trash"></i></a>';
          return rtndt;
        }
      },
    ],
    "drawCallback":function() {
      datagatidnm(passdata);
    }
  });
 /* <a class="btn btn-primary '+data["bk"]+'" data-id="'+data["id"]+'" href="#registered-details"  data-toggle="modal"><i class="fa fa-calendar"></i><span class="badge br-10">'+data["count_book"]+'</span></a> */
  /* table for email show */
  jQuery("#email_msg_table").DataTable({
    dom: "lfrtipB",
    buttons: [{
    extend: "copyHtml5",
    exportOptions: {
      columns: [ 0, 1 ,2 ]
    }
    },{
    extend: "csvHtml5",
    exportOptions: {
      columns: [ 0, 1 ,2 ]
    }
    },{
    extend: "excelHtml5",
    exportOptions: {
      columns: [ 0, 1 ,2 ]
    }
    },{
    extend: "pdfHtml5",
    exportOptions: {
    columns: [ 0, 1 ,2 ]
    }
    },],
  });
});
/* put id to delete pop up */
jQuery(document).on("click", ".delete_new_customer", function () {
  var tisid=jQuery(this).attr("data-id");
  jQuery(".mybtndelete_register_customers_entry").attr("data-id", tisid);
});
/* this function for load every time when datatable load and put data on select customers */
var chkdts="1";
function datagatidnm(psdts){
  if(chkdts == "1"){
    var idarray = jQuery("#allidsnm")
     .find("input")
     .map(function() {
      var inpids = this.id;
      var pri = "";
      var prd = "";
        if(inpids.indexOf("proid") !== -1){
          pri+=this.value;
          proids.push(pri);
        }
        if(inpids.indexOf("prodt") !== -1){
          prd+=this.value;
          prodata.push(prd);
        }
      return pri;
     })
     .get();
     vm = new Vue(multiSelect)  
     chkdts = "0";
     for (var key in psdts) {
      vm.addSelected(psdts[key]);
    }
  }else{
     vm.rmnseldt();
     for (var key in psdts) {
      vm.addSelected(psdts[key]);
    }
  }
}
/* push data function from ajax dara post_list datatable */
function adddatapush(nm){
  if (!passdata.includes(nm)){
    passdata.push(nm);
  }
}
/* Show customers for emails */
jQuery(document).on("click",".all_cus_show_click",function(){
  var eml_id=jQuery(this).attr("data-id");
  jQuery.ajax({
    type:"POST",
    url: ajax_url +"user_details_ajax.php",
    data:{getallcus:1,eml_id:eml_id},
    success:function(res){
      jQuery(".custmrdtl").html(res);
    }
  });
});
/* Show customers for sms details */
jQuery(document).on("click",".sms_cus_show_click",function(){
  var eml_id=jQuery(this).attr("data-id");
  jQuery.ajax({
    type:"POST",
    url: ajax_url +"user_details_ajax.php",
    data:{getallcussms:1,eml_id:eml_id},
    success:function(res){
      jQuery(".custmrdtl").html(res);
    }
  });
});
/* code for input type file */  
jQuery(document).on("click","#fake-file-button-browse",function(){
  jQuery("#files-input-upload").click();
});

jQuery(document).on("change","#files-input-upload",function(){
  jQuery("#fake-file-input-name").val(jQuery(this).val());
});
/* /  add special offer / */
jQuery(document).on("click",".specail_offer_setting",function(){
  jQuery(".cw-loading-main").show(); 
  var special_text = jQuery("#special_text").val();  
  var coupon_type = jQuery("#so_coupon_type").val();
  var coupon_value = jQuery("#so_coupon_value").val();
  var coupon_date = jQuery("#so_expiry_date").val();
  
  jQuery("#special_offer_form").validate();
  jQuery("#special_text").rules("add",{
    required: true,
    messages: {required: "Enter special offer text"}
  });
  jQuery("#so_coupon_value").rules("add",{
    required: true,
    messages: {required: "Enter coupon value"}
  });
  jQuery("#so_expiry_date").rules("add",{
    required: true,
    messages: {required: "Please select offer date"}
  });
  if (!jQuery("#special_offer_form").valid()) {
    return false;
  }

  var datastring={coupon_type:coupon_type,coupon_value:coupon_value,coupon_date:coupon_date,special_text:special_text,action:"add_specail_offer"};
  jQuery.ajax({
    type:"POST",
    url:ajax_url + "setting_ajax.php",
    data:datastring,
    success:function(response){
      location.reload();
    }
  });
});
jQuery(document).on("change", ".cta-toggle-checkbox1", function () {
  if(jQuery(this).prop("checked")==true){       
    jQuery(".promocode_text").show();  
  }            
  else{               
    jQuery(".promocode_text").hide();     
  }
});
jQuery(document).on("click", "#accept_appointment", function (e) {
  var ajaxurl = ajax_url;
  var idd = jQuery(this).attr("data-idd");
  var staff_status = jQuery(this).attr("data-status");
  var order_id = jQuery(this).attr("data-id");
  var datast = { idd:idd,staff_status:staff_status,order_id:order_id,action:"accept_appointment_staff" };
  jQuery.ajax({
    type: "post",
    url: ajaxurl + "accept_appointment_staff.php",
    data: datast,
    success: function (response) {
      location.reload();
    }
  });
});

jQuery(document).on("click",".referral_setting",function(){
  jQuery(".refer_radio").click(function () {
    if (jQuery(this).val() == "F") {
      jQuery(".refer-percentage").removeClass("fa fa-percent");
    }
  });
  
  var refer = jQuery("#refer").prop("checked");
  var refer_1 = "N";
  if (refer == true) {
    refer_1 = "Y";
  }

  var percent_ref_flatfree = "F";
  var referral_value = jQuery("#ct_referral_value").val();

  var percent_refs_flatfree = "F";
  var refs_value = jQuery("#ct_refs_value").val();
  
  var datastring={refer_1:refer_1,percent_ref_flatfree:percent_ref_flatfree,referral_value : referral_value,percent_refs_flatfree:percent_refs_flatfree,refs_value:refs_value,action:"add_referral_setting"};
  jQuery.ajax({
    type:"POST",
    url:ajax_url + "setting_ajax.php",
    data:datastring,
    success:function(response){
      location.reload();
    }
  });
});


jQuery(document).on("click", "#decline_appointment", function (e) {
  var ajaxurl = ajax_url;
  var idd = jQuery(this).attr("data-idd");
  var staff_status = jQuery(this).attr("data-status");
  var order_id = jQuery(this).attr("data-id");
  var datast = { idd:idd,staff_status:staff_status,order_id:order_id,action:"decline_appointmentt_staff" };
  jQuery.ajax({
    type: "post",
    url: ajaxurl + "accept_appointment_staff.php",
    data: datast,
    success: function (response) {
      location.reload();
    }
  });
});
jQuery(document).on("click", "#payment_status", function (e) {
  jQuery(".myconfirmclass").show();
});
jQuery(document).on("click", ".payment-status-button", function (e) {
  var ajaxurl = ajax_url;
  var order_id = jQuery(this).attr("data-order_id");
  var datast = { order_id:order_id,action:"payment_status_of_staff" };
  jQuery.ajax({
    type: "post",
    url: ajaxurl + "staff_ajax.php",
    data: datast,
    success: function (response) {
      location.reload();
    }
  });
});
/*  language traslate enable and disable */
jQuery(document).on("change",".language_status_change",function(){
  jQuery(".cw-loading-main").show(); 
  var lang = jQuery(this).attr("data-id"); 
  var language_status = jQuery(this).prop("checked"); 
  if(language_status == true){
    language_status = "Y";
  }else{
    language_status = "N";
  }
  var datastring={lang:lang,language_status:language_status,action:"change_language_status"};
  jQuery.ajax({
  type:"POST",
  url:ajax_url + "setting_ajax.php",
  data:datastring,
  success:function(response){
      if(response == "ok"){
        jQuery(".mainheader_message").show();
        jQuery(".mainheader_message_inner").css("display", "inline");
        jQuery("#ct_sucess_message").text(errorobj_language_status_change_successfully);
        jQuery(".mainheader_message").fadeOut(3000);
        jQuery(".ct-loading-main").hide();
      }
    }
  });
});
jQuery(document).on("click", "#rating_review_submit", function () {
  jQuery(".ct-loading-main").show(); 
  var order_id = jQuery(this).attr("data-id"); 
  var staff_id = jQuery(this).attr("data-staff_id"); 
  var rating = jQuery("#ratings"+order_id).val();
  if(rating == ""){
    rating = 0;
  }
  var review = jQuery("#review_note"+order_id).val();
  var datastring={rating:rating,review:review,order_id:order_id,staff_id:staff_id,action:"rating_review"};
  jQuery.ajax({
    type:"POST",
    url:ajax_url + "rating_review_ajax.php",
    data:datastring,
    success:function(response){
      location.reload();
    }
  });
});
jQuery(document).ready(function(){
  jQuery(".staff_ratings_class").each(function(){
    var order_id = jQuery(this).attr("data-order_id");
    jQuery(".staff_ratings"+order_id).rating("refresh", {disabled: true, showClear: false, showCaption: false});
  });
  jQuery("#ratings_staff_display").rating("refresh", {disabled: true, showClear: false});
});
jQuery(document).on("click","#update_payment_status",function() {
  jQuery(".ct-loading-main").show(); 
  var order_id = jQuery(this).attr("data-order_id"); 
  var current_status = jQuery(this).attr("data-status"); 
  update_current_status = "Pending";
  if(current_status=="Pending"){
    update_current_status = "Paid";
  }
  var datastring={order_id:order_id,update_current_status:update_current_status,update_payment_status:1};
  jQuery.ajax({
  type:"POST",
  url:ajax_url + "admin_payments_ajax.php",
  data:datastring,
  success:function(response){
      if(response == "1"){
        jQuery(".ct-loading-main").hide();
        location.reload();
      }
    }
  });
});
/* preview email template */
jQuery(document).on("click",".preview_email_contents",function(){
  var site_url=site_ur.site_url;
  var id = jQuery(this).attr("data-id");  
  var email_content = jQuery("#email_message_"+id).val();
  email_content = email_content.replace("{{business_logo}}", site_url+"assets/images/cleanto-logo-new.png");;
  var template_title = jQuery(this).attr("data-title"); 
  jQuery(".email_html_content").html(email_content);
  jQuery(".modal-title").html(template_title);
  jQuery("#email-template-preview-modal").modal();
});
/* ct_stripe_create_plan change */
jQuery(document).on("change","#ct_stripe_create_plan",function () {
  jQuery(".ct-loading-main").show();
  var create_plan_status = jQuery(this).prop("checked");
  if(create_plan_status == true) {
    var ct_stripe_create_plan = "Y";
  } else {
    var ct_stripe_create_plan = "N";
  }
  var datastring = { "ct_stripe_create_plan" : ct_stripe_create_plan, "ct_create_plan" : "1" };
  jQuery.ajax({
    type: "post",
    data: datastring,
    url: ajax_url + "setting_ajax.php",
    success: function (res) {
      jQuery(".ct-loading-main").hide();
    }
  });
});
jQuery(document).on("mouseenter",".badges_show",function () {
  var o_id = jQuery(this).attr("data-order_id");
  jQuery(".badge_"+o_id).show();
});
jQuery(document).on("mouseleave",".badges_show",function () {
  jQuery(".hide_badges").hide();
});
jQuery(document).on("click",".recurring_request",function () {
  jQuery(".ct-loading-main").show();
  var rec_id = jQuery(this).attr("data-recurring_id");
  var datastring={rec_id:rec_id,add_rec_status:1};
  jQuery.ajax({
    type:"POST",
    url:ajax_url + "customer_admin_ajax.php",
    data:datastring,
    success:function(response){
      if(response == "1"){
        location.reload();
      }
    }
  });
});
jQuery(document).on("click",".accept_rec_status",function () {
  jQuery(".ct-loading-main").show();
  var rec_id = jQuery(this).attr("data-recurring_id");
  var datastring={rec_id:rec_id,accept_rec_status:1};
  jQuery.ajax({
    type:"POST",
    url:ajax_url + "customer_admin_ajax.php",
    data:datastring,
    success:function(response){
      if(response == "1"){
        location.reload();
      }
    }
  });
});
jQuery(document).on("click",".delete_rec_status",function () {
  var rec_id = jQuery(this).attr("data-recurring_id");
  var datastring={rec_id:rec_id,delete_rec_status:1};
  jQuery.ajax({
    type:"POST",
    url:ajax_url + "customer_admin_ajax.php",
    data:datastring,
    success:function(response){
      if(response == "1"){
        location.reload();
      }
    }
  });
});
jQuery(document).on("click",".ct-reschedual-calendar-appointment-cal",function () {
  var GC_id = jQuery(this).attr("data-id");
  var GC_duration = jQuery(this).attr("data-duration");
  jQuery("#edit_gc_reschedual").attr("data-gc_event",GC_id);
  jQuery("#edit_gc_reschedual").attr("data-duration",GC_duration);
  jQuery(".exp_cp_date").trigger("change");
  jQuery("#GC-details-dashboard").modal();
});
jQuery(document).on("click","#edit_gc_reschedual",function () {
  jQuery(".ct-loading-main").show();
  var dates = jQuery("#gc_date_check").val();
  var times1 = jQuery("#myuser_reschedule_time").val();
  var gc_event_id = jQuery(this).attr("data-gc_event");
  var duration = jQuery(this).attr("data-duration");
  var gc_staff_event_id = "";
  var pid = "";
  jQuery.ajax({
    type : "post",
    data : { dates : dates, timess : times1, duration : duration, gc_event_id : gc_event_id, gc_staff_event_id : gc_staff_event_id, pid : pid, reschedule_gc_booking : 1 },
    url : ajax_url+"user_details_ajax.php",
    success : function(res){
      location.reload();
    }
  });
});
jQuery(document).on("click",".mybtn_calendar_delete_booking",function () {
  jQuery(".ct-loading-main").show();
  var gc_event_id = jQuery(this).attr("data-id");
  jQuery.ajax({
    type : "post",
    data : { gc_event_id : gc_event_id, delete_gc_booking : 1
    },
    url : ajax_url+"user_details_ajax.php",
    success : function(res){
      location.reload();
    }
  });
});
jQuery(document).on("click","#change_password_link",function () {
  jQuery("#staff_password_update").slideToggle(500);
  setTimeout(function(){ jQuery("html, body").animate({ scrollTop: jQuery(document).height()-jQuery(window).height() }); }, 700);
});
jQuery(document).on("click","#update_staff_password",function () {
  jQuery(".old_pass_msg").css("display","none");
  var current_log_in_id = jQuery(this).attr("data-id");
  jQuery("#staff_password_update_form").validate({
    rules: {
      staff_old_password:{
        required: true,
      },
      staff_new_password: {
        required:true,
        minlength: 8,
        maxlength: 20,
      },
      staff_retype_new_password: {
        equalTo:"#staff_new_password",
      },
    },
    messages: {
      staff_old_password:{
        required:errorobj_please_enter_old_password, 
      },
      staff_new_password: {
        required: errorobj_please_enter_new_password,
        minlength: errorobj_password_must_be_8_character_long,
        maxlength: errorobj_password_should_not_exist_more_then_20_characters ,
      },
      staff_retype_new_password: {
        equalTo: errorobj_new_password_and_retype_new_password_mismatch,
      },
    }
  });
  if(jQuery("#staff_password_update_form").valid()){
    jQuery(".ct-loading-main").show();
    var staff_old_password = jQuery("#staff_old_password").val();
    var staff_new_password = jQuery("#staff_new_password").val();
    var staff_olddb_password = jQuery("#staff_olddb_password").val();
    jQuery.ajax({
      type : "post",
      data : { current_log_in_id : current_log_in_id, staff_old_password : staff_old_password, staff_new_password : staff_new_password, staff_olddb_password : staff_olddb_password, "staff_old_password_change" : 1 },
      url : ajax_url+"admin_profile_ajax.php",
      success : function(res){
        if(jQuery.trim(res) == "sorry"){
          jQuery(".old_pass_msg").css("display","block");
          jQuery(".old_pass_msg").addClass("error");
          jQuery(".old_pass_msg").html(errorobj_your_old_password_incorrect);
          jQuery(".ct-loading-main").hide();
        } else {
          location.reload();
        }
      }
    });
  }
});

jQuery(document).on('click','.add_client_money',function(){
  
  
  var site_url=site_ur.site_url;
  var email_id = jQuery(this).data('email');
  var preamount = jQuery(this).data('preamount');
  var add_amount = jQuery('#add_amount').val();
	var payment_method = jQuery(".payment_gateway:checked").val();
	var cc_card_num = jQuery(".cc-number").val();
		var cc_exp_month = jQuery(".cc-exp-month").val();
		var cc_exp_year = jQuery(".cc-exp-year").val();
		var cc_card_code = jQuery(".cc-cvc").val();
	
	
	
	var stripe_pubkey = baseurlObj.stripe_publishkey;
  var stripe_status = baseurlObj.stripe_status;   
	if(stripe_status=="on"){ 
		Stripe.setPublishableKey(stripe_pubkey);  
	}

		
		var dataString={'email_id': email_id,
      'add_amount': add_amount,
      'preamount': preamount,
      'payment_method': payment_method,
			 cc_card_num:cc_card_num,
			 cc_exp_month:cc_exp_month,
			 cc_exp_year:cc_exp_year,
			 cc_card_code:cc_card_code,
      'action':'add_money_client_wallet'};
	
	if(payment_method == "stripe-payment"){
	
    jQuery("#cart_submit").validate({
      rules: {
        ct_card_number:{
          required: true,
        },
        ct_exp_month: {
          required:true,
        },
        ct_exp_year: {
          required: true,
        },
        ct_cvc_code: {
          required: true,
        },
        add_amount: {
          required: true,
        },
      },
      messages: {
        ct_card_number:{
          required:"The cart number is required field", 
        },
        ct_exp_month: {
         required:"The exp month is required field", 
        },
        ct_exp_year: {
          required:"The exp year is required field", 
        },
        ct_cvc_code: {
          required:"The cvc code is required field", 
        },
        add_amount: {
          required:"The amount is required field", 
        },
      }
    });
		
		if(jQuery("#cart_submit").valid()){ 
			jQuery(".ct-loading-main-complete_booking").show();
			var stripeResponseHandler = function(status, response) {   
			
				if (response.error) {
					/* Show the errors on the form*/
					clicked=false; 
					jQuery(".ct-loading-main-complete_booking").hide();
					jQuery("#ct-card-payment-error").show();
					jQuery("#ct-card-payment-error").text(response.error.message);        
				} else {
					/* token contains id, last4, and card type*/
					var token = response.id;
					
					function waitForElement(){ 
						if(typeof token !== "undefined" && token != ""){ 
							var st_token = token;                 
							dataString["st_token"] = st_token;
							jQuery.ajax({
								type:"POST",
								url:site_url+"front/checkout.php",
								data:dataString,
								success:function(response){

									if(jQuery.trim(response) == "ok"){
										jQuery(".ct-loading-main-complete_booking").hide();
										window.location=site_url+"admin/wallet-history.php"; 
									}else{
										clicked=false; 
										jQuery(".ct-loading-main-complete_booking").hide();
										jQuery("#ct-card-payment-error").show();
										jQuery("#ct-card-payment-error").text(response);
									}
								}
							});
						} else{ 
							setTimeout(function(){ waitForElement(); },2000); 
						} 
					}
					waitForElement();
				}
			};
			
	}
			/*Disable the submit button to prevent repeated clicks*/
			Stripe.card.createToken({
			number: jQuery(".ct-card-number").val(),
			cvc: jQuery(".ct-cvc-code").val(),
			exp_month: jQuery(".ct-exp-month").val(),
			exp_year: jQuery(".ct-exp-year").val()
			}, stripeResponseHandler); 
          }else if(payment_method == "paypal"){ 
					
						jQuery("#cart_submit").validate({
							rules: {
							add_amount: {
							required: true,
						}
						},
							messages: {
							add_amount: {
							required:"The amount is required field", 
						},
						}
						});
			      if(jQuery("#cart_submit").valid()){ 
            jQuery('.ct-loading-main').show();
							jQuery.ajax({
							type: 'post',
							data: dataString,
							url: site_url + "front/checkout.php",
							success: function (res) {
								var response_detail = jQuery.parseJSON(res);
									if (response_detail.status == 'success') {
										window.location = response_detail.value;
									}
									if (response_detail.status == 'error') {
										clicked = false;
										jQuery('.ld-loading-main-complete_booking').hide();
										jQuery('#paypal_error').show();
										jQuery('#paypal_error').text(response_detail.value);
									}
								}
							});
					 }
          }
	
	 
/*   jQuery.ajax({
    type: 'post',
    data: {
      'email_id': email_id,
      'add_amount': add_amount,
      'preamount': preamount,
      'payment_method': payment_method,
      'action':'add_money_client_wallet'
    },
    url: site_url + "front/checkout.php",
    success: function (res) {
      var response_detail = jQuery.parseJSON(res);
        if (response_detail.status == 'success') {
          window.location = response_detail.value;
        }
        if (response_detail.status == 'error') {
          clicked = false;
          jQuery('.ld-loading-main-complete_booking').hide();
          jQuery('#paypal_error').show();
          jQuery('#paypal_error').text(response_detail.value);
        }
      }
  }); */
});

jQuery(document).on('click', '.copy_refer_earn', function () {
  jQuery('#usr').select();
  document.execCommand('copy');
  jQuery('.copied_text').show();
  jQuery('.copied_text').hide(10000);
});

jQuery(document).on('click','.accept_staff_request',function(){ 
  jQuery('.ld-loading-main').show();
  var site_url=site_ur.site_url;
  var email_id = jQuery(this).data('email');
  var reqid = jQuery(this).data('reqid');
  var staffid = jQuery(this).data('staffid');
  var currentamount = jQuery(this).data('currentamount');
  var requestamount = jQuery(this).data('requestamount');
  jQuery.ajax({
    type: 'post',
    data: { 'email_id': email_id, 'staffid': staffid, 'reqid': reqid, 'currentamount': currentamount, 'requestamount': requestamount, 'action':'accept_staff_request' },
    url: site_url + "front/checkout.php",
    success: function (res) {
    var response_detail = jQuery.parseJSON(res);
      if (response_detail.status == 'success') {
        window.location = response_detail.value;
      }
      if (response_detail.status == 'error') {
        clicked = false;
        jQuery('.ld-loading-main-complete_booking').hide();
        jQuery('#paypal_error').show();
        jQuery('#paypal_error').text(response_detail.value);
      }
    }
  });
});



jQuery(document).ready(function () {
    jQuery(document).on("change", ".payment_gateway", function() {
				
        
        if(jQuery(this).is(":checked")){
				
					jQuery(this).prop( "checked", true );
					if(jQuery(this).val() == "2checkout-payment"){
						jQuery('#card-payment-fields').show();
					}else{
						jQuery('#card-payment-fields').hide();
					}
				}else
				{
					jQuery('.payment_gateway').prop( "checked", false );
				}
    });
		jQuery(".allownumericwithoutdecimal").on("keypress keyup blur",function (event) { 
					
           jQuery(this).val(jQuery(this).val().replace(/[^\d].+/, ""));
            if ((event.which < 48 || event.which > 57)) {
                event.preventDefault();
            }
    });
});
		

		
	jQuery(document).ready(function () {
	jQuery(document).on("change", ".payment_gateway", function() {
			if(jQuery("#pay-card").is(":checked")){
				jQuery('#card-payment-fields').show();
			}else{
				jQuery('#card-payment-fields').hide();
			}
	});
	jQuery(".allownumericwithoutdecimal").on("keypress keyup blur",function (event) { 
		jQuery(this).val(jQuery(this).val().replace(/[^\d].+/, ""));
		if ((event.which < 48 || event.which > 57)) {
			event.preventDefault();
		}
	});
});
/* create embed code according to service */
jQuery(document).on('click','#genrate_embed',function(){ 
  /* jQuery('.ld-loading-main').show(); */
  var site_url=site_ur.site_url;	
	var service_ids = jQuery("#service_name").val();

  jQuery.ajax({
    type: 'post',
    data: { 'service_ids': service_ids, 'action':'create_embed_accordingly' },
    url: ajax_url + "service_ajax.php",
    success: function (res) {
		var response_detail = jQuery.parseJSON(res);
			jQuery('.ld-loading-main-complete_booking').hide();
			/* jQuery("#cta-user-embedd-code-service").css("display","block");
			jQuery(".ct-embed-code-help-service").css("display","block"); */
			
			jQuery('#cta-user-embedd-code-service').text(response_detail.embed);									
    }
  });
});

jQuery(document).on("focusout", "#ct-member-country", function () {
    
    var address = jQuery("#ct-member-address").val();
    var city = jQuery("#ct-member-city").val();
    var state = jQuery("#ct-member-state").val();
    var zip = jQuery("#ct-member-zip").val();
    var country = jQuery("#ct-member-country").val();
   
    jQuery.ajax({
    type: 'post',
    data: { 'address': address,'city': city,'state': state,'zip': zip,'country': country, 'action':'get_lat_lon' },
    url: ajax_url + "staff_ajax.php",
    success: function (res) {
		
		 var response_detail = jQuery.parseJSON(res);	
			jQuery('#ct-member-latitude').attr('value',response_detail.latitude);
			jQuery('#ct-member-longitude').attr('value',response_detail.longitude);
    }
  });
  
});

jQuery(document).on('click','.future_staff_appointments',function(){ 
 jQuery("#staff-future-bookings-table").DataTable();
});
jQuery(document).on('click','.past_staff_appointments',function(){ 
 jQuery("#staff-past-bookings-table").DataTable();
});

jQuery(document).on('change','.change_date_past',function(){ 
 var from_date = jQuery("#datepicker_from").val();
 var to_date = jQuery("#datepicker_to").val();
   if(from_date != ""){ 
	 jQuery.ajax({
		type: 'post',
		data: { 'from_date': from_date,'to_date': to_date,'action':'get_staff_past_rec' },
		url: ajax_url + "staff_ajax.php",
		success: function (res) {
			
		}
	 });
   }
});

/* Customer Add Code */
jQuery(document).on("click", "#new_cus_edit_add_admin", function (e) { 
	var id = jQuery(this).data("id");
	var admin_cus_edit_email = jQuery("#admin_cus_edit_email").val();
	var admin_cus_edit_pwd = jQuery("#admin_cus_edit_pwd").val();
	var admin_cus_edit_fstnm = jQuery("#admin_cus_edit_fstnm").val();
	var admin_cus_edit_lstnm = jQuery("#admin_cus_edit_lstnm").val();
	var phno = jQuery("#admin_cus_edit_phone").val();
	var admin_cus_edit_str_addr = jQuery("#admin_cus_edit_add").val();
	var admin_cus_edit_zipcode = jQuery("#admin_cus_edit_zip").val();
	var admin_cus_edit_city = jQuery("#admin_cus_edit_city").val();
	var admin_cus_edit_state = jQuery("#admin_cus_edit_state").val();	
	var admin_cus_edit_note = jQuery("#admin_cus_edit_notes").val();

 	jQuery.validator.addMethod("lettersonly", function(value, element) {
		return this.optional(element) || /^[a-zA-Z\s]+$/.test(value);
	}); 
 	jQuery(".edit_new_user_add").validate({
	rules: {
			admin_cus_edit_email: {
				required: true,
				email: true,
				/* remote: {
					url:ajax_url+"eml_sms_ajax.php",
					type: "POST",
					async:false,
					data: {
						email: function(){ return jQuery("#admin_cus_edit_email").val(); },
						id : id,
						action:"check_client_email"
					}
				}, */
			},  
			admin_cus_edit_fstnm: {
				required: true,
				lettersonly: true,
			}, 
			admin_cus_edit_lstnm: {
				required: true,
				//lettersonly: true,
			}, 
			admin_cus_edit_phone: {
				required: true,
				//number: true,
				minlength: 6,
			}, 
			admin_cus_edit_add: {
				required: true,
			}, 
			admin_cus_edit_zip: {
				required: true,
			},
			admin_cus_edit_city: {
				required: true,
				lettersonly: true,
			},
			admin_cus_edit_state: {
				required: true,
				lettersonly: true,
			},
		},			
		messages:{ 
			admin_cus_edit_email: {
				required: errorobj_please_enter_email,
				email: errorobj_please_enter_valid_email_address,
				remote: errorobj_email_already_exists,
			},
			/* 	admin_cus_edit_pwd: {
				required: errorobj_please_enter_password,
				minlength: errorobj_password_must_be_8_character_long,
			}, */
			admin_cus_edit_fstnm: {
				required: errorobj_please_enter_firstname,
				lettersonly: errorobj_enter_only_alphabets,
			},
			admin_cus_edit_lstnm: {
				required: errorobj_please_enter_lastname,
				//lettersonly: errorobj_enter_only_alphabets,
			},
			admin_cus_edit_phone: {
				required: errorobj_please_enter_phone_number,
				//number: errorobj_enter_only_digits,
				minlength: errorobj_please_enter_phone_number,
			},
			admin_cus_edit_add: {
				required: errorobj_please_enter_address,
			},
			admin_cus_edit_zip: {
				required: errorobj_please_enter_zipcode,
			},
			admin_cus_edit_city: {
				required: errorobj_please_enter_city,
				lettersonly: errorobj_enter_only_alphabets,
			},
			admin_cus_edit_state: {
				required: errorobj_please_enter_state,
				lettersonly: errorobj_enter_only_alphabets,
			},
		},
	}); 
	if(jQuery(".edit_new_user_add").valid()){ 
		jQuery.ajax({
			type:"POST",
			
			data:{update_crm_user_detail:1,admin_cus_edit_email:admin_cus_edit_email,admin_cus_edit_pwd:admin_cus_edit_pwd,admin_cus_edit_fstnm:admin_cus_edit_fstnm,admin_cus_edit_lstnm:admin_cus_edit_lstnm,admin_cus_edit_phno:phno,admin_cus_edit_str_addr:admin_cus_edit_str_addr,admin_cus_edit_zipcode:admin_cus_edit_zipcode,admin_cus_edit_city:admin_cus_edit_city,admin_cus_edit_state:admin_cus_edit_state,admin_cus_edit_note:admin_cus_edit_note,id:id},
			url: ajax_url +"user_details_ajax.php",
			success:function(res){
				if(res == "NoData"){
					jQuery(".fltr_error_show").html("No Records Available Please Try Again").show();
					jQuery("#add_new_email_sms").hide();
					return;
				}else{
						jQuery(".mainheader_message").show();
						jQuery(".mainheader_message_inner").css("display", "inline");
						jQuery("#ct_sucess_message").text('update successful');
						jQuery(".mainheader_message").fadeOut(8000);	
						location.reload();
						//window.location.href = "https://greenfrogcleaning.com/cleanto/admin/calendar.php";
				}
			}
		});
	} 
});
