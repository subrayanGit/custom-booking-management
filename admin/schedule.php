<?php include (dirname(__FILE__) . '/header.php');
include (dirname(dirname(__FILE__)) . "/objects/class_dayweek_avail.php");
include (dirname(__FILE__) . '/user_session_check.php');
include (dirname(dirname(__FILE__)) . "/objects/class_offbreaks.php");
include (dirname(dirname(__FILE__)) . "/objects/class_offtimes.php");
$obj_offtime = new cleanto_offtimes();
$obj_offtime->conn = $conn;
$setting = new cleanto_setting();
$setting->conn = $conn;
$getdateformat = $setting->get_option('ct_date_picker_date_format');
$con = new cleanto_db();
$conn = $con->connect();
$objdayweek_avail = new cleanto_dayweek_avail();
$objdayweek_avail->conn = $conn;
$objoffbreaks = new cleanto_offbreaks();
$objoffbreaks->conn = $conn;
$time_int = $objdayweek_avail->getinterval();
$time_interval = $time_int[2];
$time_format = $setting->get_option('ct_time_format'); ?>
<div id="cta-staff-panel" class="panel tab-content">	
	<div class="panel-body">        
		<hr id="hr"/>        
		<ul class="nav nav-tabs nav-justified ct-staff-right-menu">            
			<li class="active"><a href="#member-details" data-toggle="tab"><?php echo $label_language_values['view_slots_by']; ?></a></li>            
			<li><a href="#member-availabilty" class="availability" data-toggle="tab"><?php echo $label_language_values['availabilty']; ?></a></li>            
			<li><a href="#member-addbreaks" data-toggle="tab"><?php echo $label_language_values['add_breaks']; ?></a></li>            
			<li><a href="#member-offtime" data-toggle="tab" class="myoff_timeslink"><?php echo $label_language_values['off_time']; ?></a></li>            
			<li><a href="#member-offdays" data-toggle="tab"><?php echo $label_language_values['off_days']; ?></a></li>        
		</ul>        
		<div class="tab-pane active"> <!-- first staff nmember -->            
			<div class="container-fluid tab-content ct-staff-right-details">                
				<div class="tab-pane col-lg-12 col-md-12 col-sm-12 col-xs-12 active" id="member-details">                    
					<div class="col-lg-10 col-md-10 col-sm-10 col-xs-12">                        <table class="ct-staff-common-table">                            
						<tbody>                            
							<tr>                                
								<td><label for="phone-number"><?php echo $label_language_values['schedule_type']; ?></label></td>                                
								<td style="float: left;">                                    
									<label for="schedule-type1">  
									<?php $staff_id = $_SESSION['ct_adminid'];
									$option = $objdayweek_avail->					get_schedule_type_according_provider($staff_id); ?>										
									<input class='weekly_monthly_slots' data-toggle="toggle" data-size="small" type='checkbox' id="schedule-type1" <?php 
									if ($option[7] == "monthly"){ ?> checked <?php } ?> data-on="<?php echo $label_language_values['monthly']; ?>" data-off="<?php echo $label_language_values['weekly']; ?>" data-onstyle='info' data-offstyle='warning' />						
									</label>                                
									</td>                            
									</tr>                            
									<tr>
										<td><span class="login_user_id" id="login_user_id" data-id="<?php echo $_SESSION['ct_adminid']; ?>"></td> 
									</tr>                            
								</tbody>                        
							</table>                    
						</div>                
					</div>                
<div class="tab-pane member-availabilty myloadedslots" id="member-availabilty">                 
	<?php $staff_id = $_SESSION['ct_adminid'];
	$option = $objdayweek_avail->get_schedule_type_according_provider($staff_id);
	$weeks = $objdayweek_avail->get_dataof_week();
	$weekname = array(
	    $label_language_values['first'],
	    $label_language_values['second'],
	    $label_language_values['third'],
	    $label_language_values['fourth'],
	    $label_language_values['fifth']
	);
	$weeknameid = array(
	    $label_language_values['first_week'],
	    $label_language_values['second_week'],
	    $label_language_values['third_week'],
	    $label_language_values['fourth_week'],
	    $label_language_values['fifth_week']
	);
	if ($option[7] == 'monthly')
	{
	    $minweek = 1;
	    $maxweek = 5;
	}
	elseif ($option[7] == 'weekly')
	{
	    $minweek = 1;
	    $maxweek = 1;
	}
	else
	{
	    $minweek = 1;
	    $maxweek = 1;
	} ?>                    
		<form id="" method="POST">                        
			<div class="panel panel-default">                            
				<div class="col-sm-3 col-md-3 col-lg-3 col-xs-12 ct-weeks-schedule-menu">                                
					<ul class="nav nav-pills nav-stacked">                                    <?php if ($minweek == 1 && $maxweek == 5)
					{
					    for ($i = $minweek;$i <= $maxweek;$i++)
					    { ?>                                            
					    	<li class="<?php if ($i == 1)
					        {
					            echo "active";
					        } ?>">
					        <a href="#<?php echo $weeknameid[$i - 1]; ?>" data-toggle="tab"><?php echo $weeknameid[$i - 1]; ?> </a></li>  <?php
					    }
					}
					else
					{
					    $i = 1; ?>                                        
					    <li class="<?php if ($i == 1)
					    {
					        echo "active";
					    } ?>"><a href="#<?php echo $weeknameid[$i - 1]; ?>" data-toggle="tab"><?php echo $label_language_values['this_week']; ?></a></li>
					<?php 	} ?>                                
					</ul>                            
					</div>                            
					<div class="col-sm-9 col-md-9 col-lg-9 col-xs-12">             
						<hr id="vr"/>                                
						<div class="tab-content">							
							<span class="prove_schedule_type" style="visibility: hidden;"><?php echo $option[7]; ?></span>                                    <?php for ($i = $minweek;$i <= $maxweek;$i++)
							{ ?>                                        
								<div class="tab-pane <?php if ($i == 1)
						    {
						        echo "active";
						    } ?>" id="<?php echo $weeknameid[$i - 1]; ?>">                                            
						    <div class="panel panel-default">                                                
						    	<div class="panel-body">                                                    
	<?php if ($minweek == 1 && $maxweek == 1)
    { ?>                                                        
    	<h4 class="ct-right-header"><?php echo $label_language_values['this_week_time_scheduling']; ?></h4>                                                    
    	<?php
    }
    else
    { ?>                                                        
    	<h4 class="ct-right-header"><?php echo $weekname[$i - 1]; ?><?php echo " " . $label_language_values['week_time_scheduling']; ?></h4>                                                    
    	<?php
    } ?>                                                    
    <ul class="list-unstyled" id="ct-staff-timing">                                                        
    	<?php $staff_id = $_SESSION['ct_adminid'];
    for ($j = 1;$j <= 7;$j++)
    {
        $objdayweek_avail->week_id = $i;
        $objdayweek_avail->weekday_id = $j;
        $getvalue = $objdayweek_avail->get_time_slots($staff_id);
        $daystart_time = $getvalue[4];
        $dayend_time = $getvalue[5];
        $offdayst = $getvalue[6]; ?>                                                            
        <li class="active">                                                            
        	<span class="col-sm-3 col-md-3 col-lg-3 col-xs-12 ct-day-name"><?php echo $label_language_values[strtolower($objdayweek_avail->get_daynamebyid($j)) ]; ?></span>														
        	<span class="col-sm-2 col-md-2 col-lg-2 col-xs-12 my-schedule-main">															
        	<label class="cta-col2" for="ct-monFirst<?php echo $i; ?><?php echo $j; ?>_<?php echo $getvalue[0]; ?>">																   
        	<input class='chkdaynew' data-toggle="toggle" data-size="small" type='checkbox' id="ct-monFirst<?php echo $i; ?><?php echo $j; ?>_<?php echo $getvalue[0]; ?>" <?php if ($getvalue[6] == 'Y' || $getvalue[6] == ''){ echo ""; } else { echo "checked";
	        } ?> data-on="<?php echo $label_language_values['o_n']; ?>" data-off="<?php echo $label_language_values['off']; ?>" data-onstyle='primary' data-offstyle='default' />															                 
	        </label>														
	        </span>														
	        <span  class="col-sm-7 col-md-7 col-lg-7 col-xs-12 ct-staff-time-schedule">															
	<div class="pull-right">                                                                
	   <select class="selectpicker starttimenew" data-aid="<?php echo $i; ?>_<?php echo $j; ?>" id="starttimenews_<?php echo $i; ?>_<?php echo $j; ?>" style="display: none;">                                                                    
	    <?php $min = 0;
        $t = 1;
        while ($min < 1440)
        {
            if ($min == 1440)
            {
                $timeValue = date('G:i', mktime(0, $min - 1, 0, 1, 1, 2015));
            }
            else
            {
                $timeValue = date('G:i', mktime(0, $min, 0, 1, 1, 2015));
            }
            $timetoprint = date('G:i', mktime(0, $min, 0, 1, 1, 2014)); ?>                                                                        
            <option <?php if ($getvalue[4] == date("H:i:s", strtotime($timeValue)))
            {
                $t = 10;
                echo "selected";
            }
            if ($t == 1)
            {
                if ("10:00:00" == date("H:i:s", strtotime($timeValue)))
                {
                    echo "selected";
                }
            } ?> value="<?php echo date("H:i:s", strtotime($timeValue)); ?>">                                                                            
            <?php if ($time_format == 24)
            {
                echo date("H:i", strtotime($timetoprint));
            }
            else
            {
                echo str_replace($english_date_array, $selected_lang_label, date("h:i A", strtotime($timetoprint)));
            } ?>                                                                        
            </option>                                                                        
            <?php $min = $min + $time_interval;
        } ?>                                                                
        </select>                                                                
        <span class="ct-staff-hours-to"> <?php echo $label_language_values['to']; ?> </span>                                                                
        <select class="selectpicker endtimenew" data-aid="<?php echo $i; ?>_<?php echo $j; ?>" data-size="10" id="endtimenews_<?php echo $i; ?>_<?php echo $j; ?>"                                                                        
        	style="display: none;">                                                                    
            <?php $min = 0;
        $t = 1;
        while ($min < 1440)
        {
            if ($min == 1440)
            {
                $timeValue = date('G:i', mktime(0, $min - 1, 0, 1, 1, 2015));
            }
            else
            {
                $timeValue = date('G:i', mktime(0, $min, 0, 1, 1, 2015));
            }
            $timetoprint = date('G:i', mktime(0, $min, 0, 1, 1, 2014)); ?>                                                                        
            <option <?php if ($getvalue[5] == date("H:i:s", strtotime($timeValue)))
            {
                $t = 10;
                echo "selected";
            }
            if ($t == 1)
            {
                if ("20:00:00" == date("H:i:s", strtotime($timeValue)))
                {
                    echo "selected";
                }
            } ?>                                                                            value="<?php echo date("H:i:s", strtotime($timeValue)); ?>">                                                                            
            <?php if ($time_format == 24)
            {
                echo date("H:i", strtotime($timetoprint));
            }
            else
            {
                echo str_replace($english_date_array, $selected_lang_label, date("h:i A", strtotime($timetoprint)));
            } ?>                                                                        
            </option>                                                                        
            <?php $min = $min + $time_interval;
        } ?>                                                                
        </select>                                                            
        </div>                                                
        </span>                                                            
        </li>                                                        
        <?php
    } ?>                                                    
    </ul>                                                
    </div>                                            
    </div>                                        
    </div>                                    
    <?php
} ?>                                
</div>                            
</div>                        
</div>                        
<table class="ct-staff-common-table">                            
    <tbody>                           
     <tr>                                                                
        <td>                                    
            <a id="" value="" name="update_schedule"                                       class="btn btn-success ct-btn-width btnupdatenewtimeslots_monthly"
            type="submit"><?php echo $label_language_values['save_availability']; ?> </a>                                
        </td>                            
    </tr>                            
</tbody>                        
</table>                    
</form>                    
<?php ?>                    
<?php ?>                
</div>                
<!-- Break -->                
<div class="tab-pane member-addbreaks" id="member-addbreaks">                   
 <div class="panel panel-default">                        
    <div class="panel-body">                            
    <?php $breaks_weekname = array(
    $label_language_values['first'],
    $label_language_values['second'],
    $label_language_values['third'],
    $label_language_values['fourth'],
    $label_language_values['fifth']
);
$breaks_weeknameid = array(
    $label_language_values['first_week'],
    $label_language_values['second_week'],
    $label_language_values['third_week'],
    $label_language_values['fourth_week'],
    $label_language_values['fifth_week']
);
if ($option[7] == 'monthly')
{
    $minweek = 1;
    $maxweek = 5;
}
elseif ($option[7] == 'weekly')
{
    $minweek = 1;
    $maxweek = 1;
}
else
{
    $minweek = 1;
    $maxweek = 1;
} ?>                            <!-- Start here -->                            
<div class="col-sm-3 col-md-3 col-lg-3 col-xs-12 ct-weeks-breaks-menu">                                
    <ul class="nav nav-pills nav-stacked">                                    
        <?php if ($minweek == 1 && $maxweek == 5)
            {
                for ($i = $minweek;$i <= $maxweek;$i++)
                { ?>                                            
                    <li class="<?php if ($i == 1)
                    {
                        echo "active";
                    } ?>"><a href="#<?php echo $breaks_weeknameid[$i - 1] . "_br"; ?>" data-toggle="tab"><?php echo $breaks_weeknameid[$i - 1]; ?> </a></li> <?php
                            }
            }
            else
            {
                $i = 1; ?>                                        
                <li class="<?php if ($i == 1){ echo "active"; } ?>"><a href="#<?php echo $breaks_weeknameid[$i - 1] . "_br"; ?>" data-toggle="tab"><?php echo $label_language_values['this_week']; ?></a></li>
            <?php } ?>                                
            </ul>                            
        </div>                            
    <div class="col-sm-9 col-md-9 col-lg-9 col-xs-12 ct-weeks-breaks-details">                                
        <div class="tab-content">                                    
            <?php $breaks_weekname = array(
            $label_language_values['first'],
            $label_language_values['second'],
            $label_language_values['third'],
            $label_language_values['fourth'],
            $label_language_values['fifth']
        );
        $breaks_weeknameid = array(
            $label_language_values['first_week'],
            $label_language_values['second_week'],
            $label_language_values['third_week'],
            $label_language_values['fourth_week'],
            $label_language_values['fifth_week']
        ); ?>                                    
        <?php for ($i = $minweek;$i <= $maxweek;$i++)
        { ?>                                        
            <div class="tab-pane <?php if ($i == 1) { echo "active"; } ?>" id="<?php echo $breaks_weeknameid[$i - 1] . "_br"; ?>">                            
                <div class="panel panel-default">   <div class="panel-body">           
                    <?php if ($minweek == 1 && $maxweek == 1)
                    { ?>                                                        
                        <h4 class="ct-right-header"><?php echo $label_language_values['this_week_breaks']; ?> </h4>
                    <?php
                    }
                    else
                    { ?>                                                       
                     <h4 class="ct-right-header"><?php echo $breaks_weekname[$i - 1]; ?><?php echo $label_language_values['week_breaks']; ?> </h4> 
                     <?php
                    } ?>                                                    
                    <ul class="list-unstyled" id="ct-staff-breaks">  
                    <?php $staff_id = $_SESSION['ct_adminid'];

    for ($j = 1;$j <= 7;$j++)
    {
        $break_weekday = $j;
        $objdayweek_avail->week_id = $i;
        $objdayweek_avail->weekday_id = $j;
        $getdatafrom_week_days = $objdayweek_avail->getdata_byweekid($staff_id); ?> 
        <li class="active">                                                                
            <span class="col-sm-3 col-md-3 col-lg-3 col-xs-12 ct-day-name"><?php echo $label_language_values[strtolower($objdayweek_avail->get_daynamebyid($j)) ]; ?></span>                                                                
            <?php if ($getdatafrom_week_days[0] == 'Y' || $getdatafrom_week_days[0] == '')
            { ?>                                                                    
                <span class="col-sm-2 col-md-2 col-lg-2 col-xs-12">																<a class="btn btn-small btn-default ct-small-br-btn disabled closed-btn"><?php echo $label_language_values['closed']; ?></a>														
                </span>                                                                
                <?php
                }
                else
                { ?>                                                                    
                    <span class="col-sm-2 col-md-2 col-lg-2 col-xs-12"><a id="ct-add-staff-breaks" data-weekid="<?php echo $i; ?>" data-staff_id="<?php echo $_SESSION['ct_adminid']; ?>" data-weekday="<?php echo $j; ?>"   class="btn btn-small btn-success ct-small-br-btn myct-add-staff-breaks" data-id="<?php echo $i; ?>_<?php echo $j; ?>"><?php echo $label_language_values['add_break']; ?></a></span>      
                <?php   } ?>                                                                <span class="col-sm-7 col-md-7 col-lg-7 col-xs-12 ct-staff-breaks-schedule"><ul class="list-unstyled" id="ct-add-break-ul<?php echo $i; ?>_<?php echo $j; ?>">  
                 <?php $staff_id = $_SESSION['ct_adminid'];
                $objoffbreaks->week_id = $i;
                $objoffbreaks->weekday_id = $j;
                $jc = $objoffbreaks->getdataby_week_day_id($staff_id);
                while ($rrr = mysqli_fetch_array($jc))
                { ?>                                                                        <li>                                                                            <select class="selectpicker selectpickerstart" id="start_break_<?php echo $rrr['id']; ?>_<?php echo $rrr['week_id']; ?>_<?php echo $rrr['weekday_id']; ?>" data-id="<?php echo $rrr['id']; ?>" data-weekid="<?php echo $rrr['week_id']; ?>" data-weekday="<?php echo $rrr['weekday_id']; ?>" data-size="10" style="">                                                                                
        <?php $min = 0;
            while ($min < 1440)
            {
                if ($min == 1440)
                {
                    $timeValue = date('G:i', mktime(0, $min - 1, 0, 1, 1, 2015));
                }
                else
                {
                    $timeValue = date('G:i', mktime(0, $min, 0, 1, 1, 2015));
                }
                $timetoprint = date('G:i', mktime(0, $min, 0, 1, 1, 2014)); ?>                                                                                    
                <option <?php if ($rrr['break_start'] == date("H:i:s", strtotime($timeValue))) { echo "selected"; } ?> value="<?php echo date("H:i:s", strtotime($timeValue)); ?>">                                         
                <?php if ($time_format == 24)
                {
                    echo date("H:i", strtotime($timetoprint));
                }
                else
                {
                    echo str_replace($english_date_array, $selected_lang_label, date("h:i A", strtotime($timetoprint)));
                } ?>                                                                            
                </option>                                                                         
                <?php $min = $min + $time_interval;
            } ?>                                                                            </select>                                                                            
            <span class="ct-staff-hours-to"> <?php echo $label_language_values['to']; ?> </span>                                                                            
            <select class="selectpicker selectpickerend" data-id="<?php echo $rrr['id']; ?>" data-weekid="<?php echo $rrr['week_id']; ?>" data-weekday="<?php echo $rrr['weekday_id']; ?>" data-size="10" style="display: none;">                                                                                <?php $min = 0;
            while ($min < 1440)
            {
                if ($min == 1440)
                {
                    $timeValue = date('G:i', mktime(0, $min - 1, 0, 1, 1, 2015));
                }
                else
                {
                    $timeValue = date('G:i', mktime(0, $min, 0, 1, 1, 2015));
                }
                $timetoprint = date('G:i', mktime(0, $min, 0, 1, 1, 2014)); ?>                                                                                    
                <option <?php if ($rrr['break_end'] == date("H:i:s", strtotime($timeValue)))
                { echo "selected"; } ?> value="<?php echo date("H:i:s", strtotime($timeValue)); ?>">
                <?php if ($time_format == 24)
                {
                    echo date("H:i", strtotime($timetoprint));
                }
                else
                {
                    echo str_replace($english_date_array, $selected_lang_label, date("h:i A", strtotime($timetoprint)));
                } ?>                                                                           
				</option>                                                                          
                <?php $min = $min + $time_interval;
            } ?>                                                                            
			</select>                                                                            
            <button id="ct-delete-staff-break<?php echo $rrr['id']; ?>_<?php echo $i; ?>_<?php echo $j; ?>" data-wiwdibi='<?php echo $rrr['id']; ?>_<?php echo $i; ?>_<?php echo $j; ?>' data-break_id="<?php echo $rrr['id']; ?>" class="pull-right btn btn-circle btn-default delete_break" rel="popover" data-placement='left' title="<?php echo $label_language_values['are_you_sure']; ?>?"> <i class="fa fa-trash"></i></button>                                                                            
            <div id="popover-delete-breaks<?php echo $rrr['id']; ?>_<?php echo $i; ?>_<?php echo $j; ?>" style="display: none;">                                                                                
			<div class="arrow"></div>                                                                                
			<table class="form-horizontal" cellspacing="0">  
             <tbody>    
                <tr>     
                 <td>             
                  <button id="" value="Delete" data-break_id='<?php echo $rrr['id']; ?>' class="btn btn-danger mybtndelete_breaks" type="submit"><?php echo $label_language_values['yes']; ?></button>                                                                                            
                  <button id="ct-close-popover-delete-breaks" class="btn btn-default close_popup" href="javascript:void(0)" data-break_id='<?php echo $rrr['id']; ?>_<?php echo $i; ?>_<?php echo $j; ?>'><?php echo $label_language_values['cancel']; ?></button>  
                   </td>     
                </tr>   
            </tbody>                                                                                
			</table>                                                                            
            </div>                                                                        
            </li>                                                                    
            <?php
        } ?>                                                                
        </ul>                                                            
        </li>                                                        
    <?php    } ?>                                                    
    </ul>                                                
    </div>                                           
 </div>                                        
 </div>                                    
<?php } ?>                                
</div>                                
<!-- end tab content main right -->                            
</div> <!-- End Here -->                        
</div>                    
</div>                
</div>                
<div class="tab-pane member-offtime" id="member-offtime">                    
    <div class="panel panel-default">                        
        <div class="panel-body">                            
            <div class="ct-member-offtime-inner">                                
                <h3><?php echo $label_language_values['add_your_off_times']; ?></h3>    
                 <div class="col-md-6 col-sm-7 col-xs-12 col-lg-6 mb-10 np">    
                    <label><?php echo $label_language_values['add_new_off_time']; ?></label>  <div id="offtime-daterange" class="form-control">
                     <i class="glyphicon glyphicon-calendar fa fa-calendar"></i>&nbsp; 
                     <span></span> <i class="fa fa-caret-down"></i>   
                     </div>        
                </div>                                
                <div class="col-md-2 col-sm-2 col-xs-12 col-lg-2">    
                <a href="javascript:void(0)" id="add_break" data-id="<?php echo $_SESSION['ct_adminid']; ?>" class="form-group btn btn-info mb-20" name=""><?php echo $label_language_values['add_break']; ?></a>                
                </div>                            
            </div>                            
            <div class="ct-staff-member-offtime-list-main mytablefor_offtimes mt-20 col-md-12 col-xs-12 np">                                
                <h3><?php echo $label_language_values['your_added_off_times']; ?></h3>    
                <div class="table-responsive">                                    
                    <table id="ct-staff-member-offtime-list" class="
                    ct-staff-member-offtime-lists table table-striped table-bordered dt-responsive nowrap myadded_offtimes" cellspacing="0" width="100%">    <thead>                                       
                        <tr>                                            
                            <th>#</th>                                            
                            <th><?php echo $label_language_values['start_date']; ?></th>                                            
                            <th><?php echo $label_language_values['start_time']; ?></th>                                            
                            <th><?php echo $label_language_values['end_date']; ?></th>                                            
                            <th><?php echo $label_language_values['end_time']; ?></th>                                            
                            <th><?php echo $label_language_values['action']; ?></th>                                       
                         </tr>                                        
                    </thead>                                        
                    <tbody class="mytbodyfor_offtimes">                            
                        <?php $staff_id = $_SESSION['ct_adminid'];
                            $res = $obj_offtime->get_all_offtimes($staff_id);
                            $i = 1;
                            while ($r = mysqli_fetch_array($res))
                            {
                                $st = $r['start_date_time'];
                                $stt = explode(" ", $st);
                                $sdates = $stt[0];
                                $stime = $stt[1];
                                $et = $r['end_date_time'];
                                $ett = explode(" ", $et);
                                $edates = $ett[0];
                                $etime = $ett[1]; ?>                                            
                     <tr id="myofftime_<?php echo $r['id'] ?>">
                     <td><?php echo $i++; ?></td>
                     <td><?php echo str_replace($english_date_array, $selected_lang_label, date($getdateformat, strtotime($sdates))); ?></td>
                      <?php if ($time_format == 12)
                            { ?>                                                   
                     <td><?php echo str_replace($english_date_array, $selected_lang_label, date("h:i A", strtotime($stime))); ?></td>                
                      <?php  } else  { ?>                                                    
                     <td><?php echo date("H:i", strtotime($stime)); ?></td>            
                     <?php  } ?>                                                
                     <td><?php echo str_replace($english_date_array, $selected_lang_label, date($getdateformat, strtotime($edates))); ?></td>             <?php if ($time_format == 12)
                     { ?>                                                    
                     <td><?php echo str_replace($english_date_array, $selected_lang_label, date("h:i A", strtotime($etime))); ?></td>                   
                     <?php } else { ?>                                                    
                     <td><?php echo date("H:i", strtotime($etime)); ?></td> 
                     <?php  } ?>                                                
                     <td><a data-id="<?php echo $r['id']; ?>" class='btn btn-danger ct_delete_provider left-margin'><span class='glyphicon glyphicon-remove'></span></a></td>                                            
                </tr>                                        
            <?php } ?>                                        
        </tbody>                                    
    </table>                                
</div>                            
</div>                        
</div>                    
</div>                
</div>                
<div class="tab-pane member-offdays mt-10" id="member-offdays">                    
    <div class="panel panel-default">                        
        <?php $offday->user_id = $_SESSION['ct_adminid'];
$displaydate = $offday->select_date();
$arr_all_off_day = array();
while ($readdate = mysqli_fetch_array($displaydate))
{
    $arr_all_off_day[] = $readdate['off_date'];
}
$year_arr = array(
    date('Y') ,
    date('Y') + 1
);
$month_num = date('n');
if (isset($_GET['y']) && in_array($_GET['y'], $year_arr))
{
    $year = $_GET['y'];
}
else
{
    $year = date('Y');
}
$nextYear = date('Y') + 1;
$date = date('d');
$month = array(
    ucfirst(strtolower($label_language_values['january'])) ,
    ucfirst(strtolower($label_language_values['february'])) ,
    ucfirst(strtolower($label_language_values['march'])) ,
    ucfirst(strtolower($label_language_values['april'])) ,
    ucfirst(strtolower($label_language_values['may'])) ,
    ucfirst(strtolower($label_language_values['june'])) ,
    ucfirst(strtolower($label_language_values['july'])) ,
    ucfirst(strtolower($label_language_values['august'])) ,
    ucfirst(strtolower($label_language_values['september'])) ,
    ucfirst(strtolower($label_language_values['october'])) ,
    ucfirst(strtolower($label_language_values['november'])) ,
    ucfirst(strtolower($label_language_values['december']))
);
echo '<table class="offdaystable">';
echo '<tr>';
for ($reihe = 1;$reihe <= 12;$reihe++)
{ /* 4 */
    $this_month = ($reihe - 1) * 0 + $reihe; /*write 0 instead of 12*/
    $current_year = date('Y');
    $currnt_month = date('m');
    if (($currnt_month < $this_month) || ($currnt_month == $this_month))
    {
        $year = $current_year;
    }
    else
    {
        $year = $current_year + 1;
    }
    $erster = date('w', mktime(0, 0, 0, $this_month, 1, $year));
    $insgesamt = date('t', mktime(0, 0, 0, $this_month, 1, $year));
    if ($erster == 0) $erster = 7;
    echo '<td class="ct-calendar-box col-lg-4 col-md-4 col-sm-6 col-xs-12 pull-left">';
    echo '<table align="center" class="table table-bordered table-striped monthtable">'; ?>                            <tbody class="ta-c">                            <div class="ct-schedule-month-name pull-right">                                <div class="pull-left">                                    <div class="ct-custom-checkbox">                                        <ul class="ct-checkbox-list">                                            <li>                                                <input style="margin:0px;" type="checkbox"  class="fullmonthoff all" data-prov_id="<?php echo $_SESSION['ct_adminid']; ?>" id="<?php echo $year . '-' . $this_month; ?>" <?php $offday->off_year_month = $year . '-' . $this_month;
    if ($offday->check_full_month_off() == true)
    {
        echo " checked ";
    } ?> />                                                <label for="<?php echo $year . '-' . $this_month; ?>"><span></span>                                                    <?php echo $month[$reihe - 1] . " " . $year; ?>                                                </label>                                            </li>                                        </ul>                                    </div>                                </div>                            </div>                            </tbody>                            <?php echo '<tr><td><b>' . $label_language_values['mon'] . '</b></td><td><b>' . $label_language_values['tue'] . '</b></td>';
    echo '<td><b>' . $label_language_values['wed'] . '</b></td><td><b>' . $label_language_values['thu'] . '</b></td>';
    echo '<td><b>' . $label_language_values['fri'] . '</b></td><td class="sat"><b>' . $label_language_values['sat'] . '</b></td>';
    echo '<td class="sun"><b>' . $label_language_values['sun'] . '</b></td></tr>';
    echo '<tr class="dateline selmonth_' . $year . '-' . $this_month . '"><br>';
    $i = 1;
    while ($i < $erster)
    {
        echo '<td> </td>';
        $i++;
    }
    $i = 1;
    while ($i <= $insgesamt)
    {
        $rest = ($i + $erster - 1) % 7;
        $cal_cur_date = $year . "-" . sprintf('%02d', $this_month) . "-" . sprintf('%02d', $i);
        if (($i == $date) && ($this_month == $month_num))
        {
            if (isset($arr_all_off_day) && in_array($cal_cur_date, $arr_all_off_day))
            {
                echo '<td  id="' . $year . '-' . $this_month . '-' . $i . '" data-prov_id="' . $_SESSION['ct_adminid'] . '" class="selectedDate RR offsingledate"  align=center >';
            }
            else
            {
                echo '<td  id="' . $year . '-' . $this_month . '-' . $i . '" data-prov_id="' . $_SESSION['ct_adminid'] . '"  class="date_single RR offsingledate"  align=center>';
            }
        }
        else
        {
            if (isset($arr_all_off_day) && in_array($cal_cur_date, $arr_all_off_day))
            {
                echo '<td  id="' . $year . '-' . $this_month . '-' . $i . '"  data-prov_id="' . $_SESSION['ct_adminid'] . '"  class="selectedDate RR offsingledate highlight"  align=center>';
            }
            else
            {
                echo '<td  id="' . $year . '-' . $this_month . '-' . $i . '" data-prov_id="' . $_SESSION['ct_adminid'] . '" class="date_single RR offsingledate"  align=center>';
            }
        }
        if (($i == $date) && ($this_month == $month_num))
        {
            echo '<span style="color:#000;font-weight: bold;font-size: 15px;">' . $i . '</span>';
        }
        elseif ($rest == 6)
        {
            echo '<span   style="color:#0000cc;">' . $i . '</span>';
        }
        elseif ($rest == 0)
        {
            echo '<span  style="color:#cc0000;">' . $i . '</span>';
        }
        else
        {
            echo $i;
        }
        echo "</td>\n";
        if ($rest == 0) echo "</tr>\n<tr class='dateline selmonth_" . $year . "-" . $this_month . "'>\n";
        $i++;
    }
    echo '</tr>';
    echo '</tbody>';
    echo '</table>';
    echo '</td>';
}
echo '</tr>'; /*  } */
echo '</table>'; ?>                    </div>                </div>            </div>            <!-- end first -->        </div>    </div></div><?php include (dirname(__FILE__) . '/footer.php'); ?><script type="text/javascript">    var ajax_url = '<?php echo AJAX_URL; ?>';</script>
