import React, { Component } from "react";
import { Link } from "react-router-dom";

import './Main.css';

import axios from 'axios';

import config from '../config/config';

let mainurl = config.DOMAIN_URL;

export default class UploadPage extends Component {
    constructor(props){
        super(props);


        this.state = {

        }
    }

    render() {
        
        return (
            <>  
                <header id="header">
                    <div className="container headertitle">
                        <div className="headertitle pt-3 pt-lg-2 mt-2">
                            <div className="row">
                                <div className="col-12 text-center">
                                    <h1 className="text-5 font-weight-500 text-white mb-4">Civil Disobedience Movement Myanmar</h1>
                                    <h2 className="text-5 font-weight-500 text-white mb-4">လူထု လှုပ်ရှားမှုမှ ကြိုဆိုပါသည်</h2>
                                    <p className="text-2 text-white line-height-4 mb-4">Civil Disobedience Movement (CDM) တွင် ပါဝင်သော ပြည်သူ့ဝန်ထမ်း သူရဲကောင်းများကို လေးစားဂုဏ်ပြုအပ်ပါသည်။</p>
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
