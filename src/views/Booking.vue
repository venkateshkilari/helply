<template>

	<body>
		<!--============================= HEADER =============================-->
		<HelplyHeader />

		<!--//END HEADER -->
		<!--============================= BOOKING SECTION =============================-->
		<section class="booking-details center-block main-block" style="margin-left: 8%;margin-right: 8%;">
			<div class="container">
				<div class="row">
					<div class="col-md-12">
						<h2>{{getLabelFor('header')}}</h2>
						<h6>{{getLabelFor('headerDescription')}}</h6>
					</div>
				</div>
				<div class="row mt-5">
					<div class="col-md-8 set-sm-fit mb-4">
						<form action="#">
							<div class="preference-title">
								<h4>Cleaning Preferences</h4>
							</div>
							<!-- preferences Wrap -->
							<div class="preferences">
								<!-- Home about -->
								<div class="preference-radio mt-4">
									<p>Tell us about your home</p>
								</div>
								<div class="row">
									<div class="col-md-4">
										<div class="preference-icon">
											<img src="images/double-bed.svg">
											<p>BEDROOMS</p>
										</div>
										<div class="counter js-counter">
                      <div class="counter__item">
                        <a class="counter__minus js-counter-btn fa fa-minus" aria-hidden="true" data-action="minus"></a>
                      </div>
                      <div class="counter__item counter__item--center"> 
                          <input id="bedrooms" class="counter__value js-counter-value" value="1" type="text" disabled="disabled" tabindex="-1" min="0" max="10" required=""> 
                      </div>
                      <div class="counter__item">
                        <a class="counter__plus js-counter-btn fa fa-plus" aria-hidden="true" data-action="plus"></a>
                      </div>
                    </div>
									</div>
									<div class="col-md-4">
										<div class="preference-icon">
											<img src="images/shower.svg">
											<p>BATHROOMS</p>
										</div>
										<div class="counter js-counter">
                      <div class="counter__item">
                        <a class="counter__minus js-counter-btn fa fa-minus" aria-hidden="true" data-action="minus"></a>
                      </div>
                      <div class="counter__item counter__item--center"> 
                        <input id="bathrooms" class="counter__value js-counter-value" value="1" type="text" disabled="disabled" tabindex="-1" min="0" max="10" required="">
                      </div>
                      <div class="counter__item">
                        <a class="counter__plus js-counter-btn fa fa-plus" aria-hidden="true" data-action="plus"></a>
                      </div>
                    </div>
									</div>
									<div class="col-md-4">
										<div class="preference-icon">
											<img src="images/shower.svg">
											<p>PERSONS</p>
										</div>
											<div class="counter js-counter">
                      <div class="counter__item">
                        <a class="counter__minus js-counter-btn fa fa-minus" aria-hidden="true" data-action="minus"></a>
                      </div>
                      <div class="counter__item counter__item--center"> 
                        <input id="persons" class="counter__value js-counter-value" value="1" type="text" disabled="disabled" tabindex="-1" min="0" max="10" required="">
                      </div>
                      <div class="counter__item">
                        <a class="counter__plus js-counter-btn fa fa-plus" aria-hidden="true" data-action="plus"></a>
                      </div>
                    </div>
									</div>
								</div>
								<!--// Home about -->
								<div class="preference-radio mt-4">
									<p>How often would you like cleaning?</p>
								</div>
                  				<div class="row">
                                    <div class="col sm-box">
                                        <RadioButtonComponent rootClass="styled-radio styled-radio2" name="frequencySelector" id="one-time" label="ONE TIME" v-model="frequency.onetime" @change="toggleCollapse(frequency.onetime)"/>
                                    </div>
                                    <div class="col sm-box">
                                      <RadioButtonComponent rootClass="styled-radio styled-radio2" name="frequencySelector" id="weekly" label="WEEKLY" v-model="frequency.weekly" @change="toggleCollapse(frequency.weekly)"/>
                                    </div>
                                    <div class="col sm-box">
                                      <RadioButtonComponent rootClass="styled-radio styled-radio2" name="frequencySelector" id="bi-weekly" label="BI-WEEKLY" v-model="frequency.biWeekly" @change="toggleCollapse(frequency.biWeekly)"/>
                                    </div>                                    
				                          <div class="col sm-box">
                                    <RadioButtonComponent rootClass="styled-radio styled-radio2" name="frequencySelector" id="monthly" label="MONTHLY" v-model="frequency.biWeekly" @change="toggleCollapse(frequency.daily)" />
                                    </div>
				                            <div class="col sm-box">
                                      <RadioButtonComponent rootClass="styled-radio styled-radio2" name="frequencySelector" id="alternate" label="ALTERNATE" v-model="frequency.alternate" @change="toggleCollapse(frequency.alternate)"/>
                                    </div>
                                </div>
									<div class="col-md-6 sm-box">
										<ul v-show="oneTimeShow" style="list-style-type: none;padding-top: 2%;font-size: 15px;margin-left: -10%;">
											<li v-for="oneTimeService in oneTimeServices" :key="oneTimeService.id">
												<CheckBox  v-model="bookingModal.ServiceType[oneTimeService.name]" :id="oneTimeService.id" ref="checkBox" labelClass="custom-control custom-checkbox" checkboxClass="custom-control-input" customClass="custom-control-indicator" @input="updateTotalCost(oneTimeService,$event)">
													<template slot="slot">
														<span class="custom-control-description">{{oneTimeService.text}}</span>
													</template>
												</CheckBox>
											</li>
										</ul>
										<ul v-show="weeklyShow" style="list-style-type: none;padding-top: 2%;font-size: 15px;margin-left: -10%;">
											<li v-for="weeklyService in weeklyServices" :key="weeklyService.id">
												<CheckBox  v-model="bookingModal.ServiceType[weeklyService.name]" :id="weeklyService.id" ref="checkBox" labelClass="custom-control custom-checkbox" checkboxClass="custom-control-input" customClass="custom-control-indicator" @input="updateTotalCost(weeklyService,$event)">
													<template slot="slot">
														<span class="custom-control-description">{{weeklyService.text}}</span>
													</template>
												</CheckBox>
											</li>
										</ul>
										<ul v-show="biWeeklyShow" style="list-style-type: none;padding-top: 2%;font-size: 15px;margin-left: -10%;">
											<li v-for="biWeeklyService in biWeeklyServices" :key="biWeeklyService.id">
												<CheckBox  v-model="bookingModal.ServiceType[biWeeklyService.name]" :id="biWeeklyService.id" ref="checkBox"  labelClass="custom-control custom-checkbox" checkboxClass="custom-control-input" customClass="custom-control-indicator" @input="updateTotalCost(biWeeklyService,$event)">
													<template slot="slot">
														<span class="custom-control-description">{{biWeeklyService.text}}</span>
													</template>
												</CheckBox>
											</li>
										</ul>
										<ul v-show="dailyShow" style="list-style-type: none;padding-top: 2%;font-size: 15px;margin-left: -10%;">
											<li v-for="dailyService in dailyServices" :key="dailyService.id">
												<CheckBox   v-model="bookingModal.ServiceType[dailyService.name]" :id="dailyService.id" ref="checkBox"  labelClass="custom-control custom-checkbox" checkboxClass="custom-control-input" customClass="custom-control-indicator" @input="updateTotalCost(dailyService,$event)">
													<template slot="slot">
														<span class="custom-control-description">{{dailyService.text}}</span>
													</template>
												</CheckBox>
											</li>
										</ul>
										<ul v-show="alternateShow" style="list-style-type: none;padding-top: 2%;font-size: 15px;margin-left: -10%;">
											<li v-for="alternateTimesService in alternateTimesServices" :key="alternateTimesService.id">
												<CheckBox  v-model="bookingModal.ServiceType[alternateTimesService.name]" :id="alternateTimesService.id" ref="checkBox" labelClass="custom-control custom-checkbox" checkboxClass="custom-control-input" customClass="custom-control-indicator" @input="updateTotalCost(alternateTimesService,$event)">
													<template slot="slot">
														<span class="custom-control-description">{{alternateTimesService.text}}</span>
													</template>
												</CheckBox>
											</li>
										</ul>
									</div>

								<div class="preference-radio mt-4">
									<!-- Comment box -->
									<p>Do you have any special requerments? <span class="optional-fade">(optional)</span></p>
									<div class="row">
										<TextArea id="optionalTextArea" mainClass="col-md-12" />
										</div>
                            </div>
                            <!--// Comment box -->
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="preference-about_home">
                                        <h4>Choose Time and Date</h4>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <!-- Houres and Calendar -->
                                <div class="col-md-6">
                                    <div class="preference-radio mt-4">
                                        <p>When would you like to start?</p>
                                        <div class="preference-quantity houres">
                                            <SelectList id="time" name="Time" placeholder="Select Time" :options="serviceTimingsDropdownData"  :value="this.serviceTime"  @input="selectedTime" />
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="preference-radio mt-4">
                                        <p>Choose a date</p>
                                        <div class="form-group">
                                            <SelectDateComponent placeholder="Select Date" v-model="serviceDate" :format="customFormatter" :disabledDates="disabledDates" input-class="datepickerCustomClass"/> 
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row"><div class="col-md-12">
                              <ul style="color:#e84e40">
                                <li v-for="(error,index) in errorList" :key="index+'_error'">{{error}}</li>
                              </ul>
                              </div></div>
                            <!--// Houres and Calendar -->
														<div class="row mt-4">
                                    <div class="col-md-12">
                                        <ButtonComponent id="completeBooking" name="Complete Booking" buttonClass="btn btn-block complete-booking" :label="this.strippedContent" @input="saveAndPay" style="height:130%;font-size: 20px;"/>
                                    </div>
                                </div>
                        </div>
                        <!--// preferences Wrap -->
                    </form>
                </div>

                <!-- Booking Summary -->
                <div class="col-md-4 set-sm-fit">
                    <div data-toggle="affix">
                        <!-- data-toggle="affix" -->
                        <div class="preference-title">
                            <h4>Booking Summary</h4>
                        </div>
                        <div class="fesilities">
                            <ul>
                                <li><i class="fa fa-calendar" aria-hidden="true"></i>
                                    <p>{{this.getServiceDateAndTime}}</p>
                                </li>
                                <li><i class="fa fa-refresh" aria-hidden="true"></i>
                                    <p>{{this.serviceFrequency}}</p>
                                </li>
                                <li><i class="fa fa-map-marker" aria-hidden="true"></i>
                                    <p>{{this.address}}</p>
                                </li>
                            </ul>
                            <h4>Total cost<span>{{this.totalCost}}</span></h4>
                        </div>
                    </div>

                </div>
                <!--// Booking Summary -->
            </div>
        </div>
    </section>
    <!--//END BOOKING SECTION -->
<RazorPay ref="payment" description="Booking for Cleaning Services" :prefill="getUserDetails()" @PaymentResponse="paymentResponse"></RazorPay>

</body>
</template>
<script>
import TextArea from "../components/TextArea.vue";
import TextBox from "../components/TextBox.vue";
import SelectList from "../components/SelectList.vue";
import ButtonComponent from "../components/ButtonComponent.vue";
import CheckBox from "../components/CheckBox.vue";
import RadioButtonComponent from "../components/RadioButton.vue";
import SelectDateComponent from "vuejs-datepicker";
import BookingSchema from "../schema/BookingSchema.json";
import BookingModal from "../view_models/BookingModal.json";
import BookingService from "../services/booking_service.js";
import HelplyHeader from "./Header.vue";
export default {
  name: "Booking",
  components: {
    TextArea,
    SelectList,
    ButtonComponent,
    CheckBox,
    RadioButtonComponent,
    SelectDateComponent: SelectDateComponent,
    HelplyHeader: HelplyHeader
  },
  data() {
    return {
      serviceTimingsDropdownData:
        BookingSchema.BookYourCleaning.root.serviceTimeDropDownData,
      bookingModal: BookingModal,
      buttonLabel:
        "<span class='pe-7s-unlock'></span>Complete Booking <span class='d-none d-md-inline-block'>via Secure Server</span>",
      oneTimeShow: false,
      weeklyShow: false,
      biWeeklyShow: false,
      dailyShow: false,
      alternateShow: false,
      oneTimeServices: BookingSchema.BookYourCleaning.root.oneTimeServicesList,
      weeklyServices: BookingSchema.BookYourCleaning.root.weeklyServicesList,
      biWeeklyServices:
        BookingSchema.BookYourCleaning.root.biWeeklyServicesList,
      dailyServices: BookingSchema.BookYourCleaning.root.dailyServicesList,
      alternateTimesServices:
        BookingSchema.BookYourCleaning.root.alternateTimesServicesList,
      totalCost: 0,
      serviceFrequency: "...",
      address: "...",
      serviceTime: "",
      serviceDate: "",
      noOfBedrooms: 1,
      noOfBathrooms: 1,
      noOfPersons: 1,
      disabledDates: {
        to: new Date(Date.now() - 8640000)
      },
      frequency:BookingSchema.BookYourCleaning.root.Frequency,
      errorList: []
    };
  },
  mounted:function(){
    var bookingViewModal=this;
      $('.js-counter').off().on('click', function chnageCount(evt) {
    var counterBtn = evt.target;

    if (!counterBtn.closest('.js-counter-btn')) return;

    var counterInput = counterBtn.closest('.js-counter').querySelector('.js-counter-value');

    switch (counterBtn.getAttribute('data-action')) {
        case 'plus':
            counterInput.value = Number(counterInput.value) + 1;
            break;
        case 'minus':
			if( counterInput.value >= 1)
			{
				counterInput.value = Number(counterInput.value) - 1;
			}           
            break;
    }
    bookingViewModal.noOfBedrooms = $('#bedrooms').val();
    bookingViewModal.noOfBathrooms = $('#bathrooms').val();
    bookingViewModal.noOfPersons = $('#persons').val();
    });
   
   
  },
  methods: {
    getLabelFor: function(labelName) {
      return BookingSchema.BookYourCleaning.root[labelName];
    },
    toggle: function(todo) {
      todo.done = !todo.done;
    },
    toggleCollapse: function(duration) {
      this.bookingModal.ServiceType["Mopping"]=false;
      this.bookingModal.ServiceType["Dusting"]=false;
      this.bookingModal.ServiceType["FridgeCleaning"]=false;
      this.bookingModal.ServiceType["Ironing"]=false;
      this.bookingModal.ServiceType["BathroomCleaning"]=false;
      if (duration == "oneTime") {
        this.oneTimeShow = !this.oneTimeShow;
        this.serviceFrequency = "One Time";
        this.totalCost = 0;
        if (this.oneTimeShow) {
          this.weeklyShow = false;
          this.biWeeklyShow = false;
          this.dailyShow = false;
          this.alternateShow = false;
        }
      } else if (duration == "weekly") {
        this.weeklyShow = !this.weeklyShow;
        this.serviceFrequency = "Weekly";
        this.totalCost = 0;
        if (this.weeklyShow) {
          this.oneTimeShow = false;
          this.biWeeklyShow = false;
          this.dailyShow = false;
          this.alternateShow = false;
        }
      } else if (duration == "biWeekly") {
        this.biWeeklyShow = !this.biWeeklyShow;
        this.serviceFrequency = "BiWeekly";
        this.totalCost = 0;
        if (this.biWeeklyShow) {
          this.oneTimeShow = false;
          this.weeklyShow = false;
          this.dailyShow = false;
          this.alternateShow = false;
        }
      } else if (duration == "daily") {
        this.dailyShow = !this.dailyShow;
        this.serviceFrequency = "Daily";
        this.totalCost = 0;
        if (this.dailyShow) {
          this.oneTimeShow = false;
          this.biWeeklyShow = false;
          this.weeklyShow = false;
          this.alternateShow = false;
        }
      } else if (duration == "alternate") {
        this.alternateShow = !this.alternateShow;
        this.serviceFrequency = "Alternate";
        this.totalCost = 0;
        if (this.alternateShow) {
          this.oneTimeShow = false;
          this.biWeeklyShow = false;
          this.dailyShow = false;
          this.weeklyShow = false;
        }
      }
    },
    updateTotalCost: function(dataItem, event) {
      this.bookingModal.ServiceType[dataItem.name]=event;
      if (event) {
        this.totalCost = this.totalCost + dataItem.rate;
        this.bookingModal.ServiceConfiguration.CleaningConfiguration.Services = this.bookingModal.ServiceConfiguration.CleaningConfiguration.Services + dataItem.id +";";

        this.services = this.services + 1;
      } else {
        this.bookingModal.ServiceConfiguration.CleaningConfiguration.Services = this.bookingModal.ServiceConfiguration.CleaningConfiguration.Services.replace(dataItem.id +";",'');
        this.totalCost = this.totalCost - dataItem.rate;
      }
    },
    selectedTime: function(selectedServiceTime) {
      this.serviceTime = selectedServiceTime;
      this.bookingModal.ServiceConfiguration.CleaningConfiguration.Timing = selectedServiceTime;
    },
    saveAndPay: function() {
	  this.errorList=[];
      this.errorList.push("Select Time");
      this.bookingModal.PaymentDetails.Amount = this.totalCost * 100;
      if (this.serviceFrequency == "One Time") {
        this.bookingModal.ServiceConfiguration.CleaningConfiguration.EndDate =
          "";
      } else {
        this.bookingModal.ServiceConfiguration.CleaningConfiguration.EndDate = moment(
          this.serviceDate,
          "MMMM Do YYYY"
        ).add("month", 1);
      }
      this.bookingModal.ServiceConfiguration.CleaningConfiguration.Frequency = this.serviceFrequency;
      this.bookingModal.ServiceConfiguration.CleaningConfiguration.Parameter =
        "Bathrooms:" +
        this.noOfBathrooms +
        ";Bedrooms:" +
        this.noOfBedrooms +
        ";Persons:" +
        this.noOfPersons;
      BookingService.saveBookingDetails(this, this.bookingModal);
      // this.$refs.payment.initiatePayment(
      //   this.bookingModal.PaymentDetails.Amount
      // );
    },
    paymentResponse: function(response) {
      this.bookingModal.PaymentDetails.Id = response.razorpay_payment_id;
      BookingService.saveBookingDetails(this, this.bookingModal);
    },
    getUserDetails: function() {
      var details = {};
      details["name"] = this.bookingModal.User.Name;
      details["email"] = this.bookingModal.User.Email;
      return details;
    },
    customFormatter(date) {
      return moment(date).format("MMMM Do YYYY");
    }
  },
  computed: {
    strippedContent() {
      let regex = /(<([^>]+)>)/gi;
      return this.buttonLabel.replace(regex, "");
    },
    getServiceDateAndTime() {
      if (this.serviceDate != "" && this.serviceTime != "") {
        this.bookingModal.ServiceConfiguration.CleaningConfiguration.StartDate = moment(
          this.serviceDate
        ).format("MMMM Do YYYY");
        return (
          this.bookingModal.ServiceConfiguration.CleaningConfiguration
            .StartDate +
          " @ " +
          this.bookingModal.ServiceConfiguration.CleaningConfiguration.Timing
        );
      } else {
        return "...";
      }
    }
  }
};
</script>

<style>
.datepickerCustomClass {
 width: 100% !important;
 box-shadow: none !important;
 font-size: 13px !important;
 padding-top: 1.3% !important;
 padding-bottom: 1.2% !important;
 padding-left: 2% !important;
}
</style>
