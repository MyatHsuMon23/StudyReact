import React, { Component } from "react";
import { Link } from "react-router-dom";

import { ReCaptcha, loadReCaptcha } from 'react-recaptcha-v3'

import './Main.css';

import axios from 'axios';

import config from '../config/config';

let mainurl = config.DOMAIN_URL;
const recaptchasitekey = config.RE_V3_SITE_KEY;

export default class DonorPage extends Component {
    constructor(props){
        super(props);

        this.nameHandler = this.nameHandler.bind(this);
        this.phoneHandler = this.phoneHandler.bind(this);


        //this.recaptchaLoaded = this.recaptchaLoaded.bind(this);
        this.verifyCallback = this.verifyCallback.bind(this);

        this.state = {
            name : '',
            phone : '',
            isVerified : '',
            formshow : true,
        }
    }

    nameHandler(e) {
        this.setState({ name: e.target.value });
    }
    phoneHandler(e) {
        this.setState({ phone: e.target.value });
    }

    //recaptchaLoaded() {
      //  console.log('Capcha successfully loaded');
    //}
    verifyCallback(response) {
        if (response) {
            //console.log(response)
            this.setState({
                isVerified: response
            });
        }
    }

    componentDidMount(){
        loadReCaptcha(recaptchasitekey)
    }

    onSubmit = async(e)=>{
        e.preventDefault();
        try {
            const name = this.state.name;
            const phone = this.state.phone;

            const isVerified = this.state.isVerified;

            if(isVerified){
                const data = {
                    name : name,
                    phone : phone,
                };

            }else{
                alert("Error ReCaptcha")
            }   
        } catch (e) {
            console.log(e) 
        }
    }

    render() {
        const { formshow } = this.state;
        
        return (
            <>  
                <header id="header">
                    <div className="container headertitle">
                        <div className="headertitle pt-3 pt-lg-2 mt-2">
                            <div className="row">
                                <div className="col-12 text-center">
                                    <h1 className="text-5 font-weight-500 text-white mb-4">Civil Disobedience Movement Myanmar</h1>
                                    <h2 className="text-5 font-weight-500 text-white mb-4">လူထု လှုပ်ရှားမှုမှ ကြိုဆိုပါသည်</h2>
                                    <p className="text-2 text-white line-height-4 mb-4">Civil Disobedience Movement (CDM) အတွက် ပါဝင်လှူဒါန်းပေးသူများ အားလုံးကို အထူးပင်ကျေးဇူးတင်ရှိပါသည်။</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
                <div id="formsection">
                    <div className="container">
                        <div className="row">
                            <div className="col-12 col-xl-7"> 
                                <div className="wrap-login100">
                                { formshow && 
                                    <form onSubmit={this.onSubmit}>
                                        <div className="icon-text-color contact-input-style">
                                            <label htmlFor="name"> နာမည် (Name) * </label>
                                            <input type="text" className="form-control rounded" id="name" value={this.state.name} onChange={this.nameHandler} placeholder="သင့်နာမည်ဖြည့်ပါ" required/>
                                        </div>
                                        <div className="icon-text-color contact-input-style">
                                            <label htmlFor="phone"> ဖုန်းနံပါတ် (English Number ဖြင့်ရိုက်ရန်) * </label>
                                            <input type="number" className="form-control rounded" id="phone" value={this.state.phone} onChange={this.phoneHandler} placeholder="သင့်ဖုန်းနံပါတ်ဖြည့်ပါ" required/>
                                        </div>
                                        <div className="icon-text-color contact-input-style">
                                            <label htmlFor="name"> လှူဒါန်းငွေပမာဏ (Donation Amount) * </label>
                                        </div>
                                        <div className="icon-text-color contact-input-style">
                                            <label htmlFor="name"> ပုတ်ပြတ် (သို့) လစဉ် (One time or Monthly) * </label>
                                        </div>

                                        <ReCaptcha
                                            action='main'
                                            sitekey={recaptchasitekey}
                                            verifyCallback={this.verifyCallback}
                                        />
                                        
                                        <div className="justify-content-center submitbtn">
                                            <input id="#submitForm" type="submit" className="send-btn send-btn-contact rounded" value="Submit" />
                                        </div>
                                    </form>
                                }
                                </div>
                            </div>
                            <div className="col-xl-5 d-none d-sm-block"> 
                                <img className="img-fluid rounded-lg shadow-lg" src="images/img2.jpeg" /> 
                            </div>
                        </div>
                    </div>
                </div>
                <footer id="footer">
                    <div className="container">
                        <div className="footer-copyright pt-3 pt-lg-2 mt-2">
                            <div className="row">
                                <div className="col-lg">
                                    <p className="text-center mb-2 mb-lg-0">Copyright © 2021 Join CDM In Myanmar. All Rights Reserved.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
            </>
        )
    }
}
