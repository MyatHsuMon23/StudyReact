import React, { Component } from "react";
import { Link } from "react-router-dom";

import { ReCaptcha, loadReCaptcha } from 'react-recaptcha-v3'

import './Main.css';

import axios from 'axios';

import { ministry, myanmarstate } from '../_helpers';

import config from '../config/config';

let mainurl = config.DOMAIN_URL;
const recaptchasitekey = config.RE_V3_SITE_KEY;
const reporturl = config.REPORT_URL;
const type = config.TYPE_CENTRAL;
const type_small = config.TYPE_CENTRAL_SMAll;

export default class MainPage extends Component {
    constructor(props){
        super(props);

        this.needsupportHandler = this.needsupportHandler.bind(this);
        this.ministryHandler = this.ministryHandler.bind(this);
        this.departmentHandler = this.departmentHandler.bind(this);
        this.titleHandler = this.titleHandler.bind(this);
        this.stateHandler = this.stateHandler.bind(this);
        this.townshipHandler = this.townshipHandler.bind(this);
        this.noticHandler = this.noticHandler.bind(this);
        this.nameHandler = this.nameHandler.bind(this);
        this.phoneHandler = this.phoneHandler.bind(this);
        this.safetyHandler = this.safetyHandler.bind(this);
        this.financeHandler = this.financeHandler.bind(this);
        this.otherHandler = this.otherHandler.bind(this);
        this.othernameHandler = this.othernameHandler.bind(this);
        this.groupHandler = this.groupHandler.bind(this);
        this.groupmemberHandler = this.groupmemberHandler.bind(this);
        //this.recaptchaLoaded = this.recaptchaLoaded.bind(this);
        this.verifyCallback = this.verifyCallback.bind(this);

        this.handleUploadFilename = this.handleUploadFilename.bind(this);


        this.state = {
            total : 0,
            ministryitem : '',
            departmentitem : '',
            title : '',
            stateitem : '',
            townshipitem : '',
            notic : '',
            needsupport : false,
            group : false,
            groupmember : 0,
            groupmemberreq : false,
            name : '',
            namereq : false,
            phone : '',
            phonereq : false,
            safety : false,
            finance : false,
            other : false,
            othername : '',
            otherreq : false,
            formshow : true,
            finish : false,
            cdmid : '',
            hide : false, 
            isVerified: '',
            filereq : false,
            slipImg: '',
            fileName:'အထောက်အထားတင်ရန်',
            fileMessage:'',
            fileError: false,
        }
    }
    ministryHandler(e) {
        this.setState({ ministryitem: e.target.value });
    }
    departmentHandler(e) {
        this.setState({ departmentitem: e.target.value });
    }
    titleHandler(e) {
        this.setState({ title: e.target.value });
    }
    stateHandler(e) {
        this.setState({ stateitem: e.target.value });
    }
    townshipHandler(e) {
        this.setState({ townshipitem: e.target.value });
    }
    noticHandler(e) {
        this.setState({ notic: e.target.value });
    }
    nameHandler(e) {
        this.setState({ name: e.target.value });
    }
    phoneHandler(e) {
        this.setState({ phone: e.target.value });
    }
    needsupportHandler(e) {
        this.setState({ 
            needsupport: e.target.checked,
            namereq : true,
            phonereq : true, 
            filereq : true,
        });
    }
    groupHandler(e) {
        this.setState({group: e.target.checked});
    }
    groupmemberHandler(e) {
        this.setState({ 
            groupmember: e.target.value,
            groupmemberreq : true
         });
    }
    safetyHandler(e) {
        this.setState({ 
            safety: e.target.checked,
        });
    }
    financeHandler(e) {
        this.setState({ 
            finance: e.target.checked,
        });
    }
    otherHandler(e) {
        this.setState({ 
            other: e.target.checked,
            otherreq : true, 
        });
    }
    othernameHandler(e) {
        this.setState({ othername: e.target.value });
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

    handleUploadFilename = (e) => {
        const file = e.target.files[0];
        const FourMb = 4*1024*1024;

        const reader = new FileReader();
        reader.onload = ()=>{
            if(reader.readyState===2){
                if(file.size >FourMb){
                    this.setState({
                        fileError: true,
                        fileMessage:'File size is too large!'
                    })
                }else{
                    const Image = {
                        imgName : file.name,           
                        Img: reader.result,
                        containerName : "join-cdm-"+ type_small,   
                    }
    
                    axios.post(mainurl + '/api/file/upload' , Image)
                    .then(response => {
                        const imageUrl = response.data;
                        this.setState({
                            slipImg: imageUrl,
                            fileError: false,
                            fileMessage:'',
                        })
                    }).catch(e => {
                        console.log(e);
                    })
                    
                } 
            }
        }
        reader.readAsDataURL(file);

        this.setState({         
            fileName : file.name,
        })
    }
    

    componentDidMount(){
        loadReCaptcha(recaptchasitekey)
        axios.get(mainurl+'/api/cdm/total')
        .then(response => {
            this.setState({
                total : response.data[0].total,
            })
        }).catch(e => {
            console.log(e);
        })
    }

    onSubmit = async(e)=>{
        e.preventDefault();
        try {
            const ministry = this.state.ministryitem;
            const department = this.state.departmentitem;
            const title = this.state.title;
            const state = this.state.stateitem;
            const township = this.state.townshipitem;
            const notic = this.state.notic;
            const needsupport = this.state.needsupport;
            const name = this.state.name;
            const phone = this.state.phone;
            const safety = this.state.safety;
            const finance = this.state.finance;
            const other = this.state.other;
            const othername = this.state.othername;
            const group = this.state.group;
            const groupmember = this.state.groupmember;
            const isVerified = this.state.isVerified;

            const imageUrl = this.state.slipImg;

            const data = {
                ministryname : ministry,
                department : department,
                title : title,
                state : state,
                township : township,
                notic : notic,
                group : {
                    isgroup : group,
                    groupmember : groupmember
                },
                needsupport : {
                    need : needsupport,
                    name : name,
                    phone : phone,
                    safety : safety,
                    finance : finance,
                    other : {
                        other : other,
                        name : othername
                    }
                },
                uploadfile : imageUrl,
                type : type,
            };

            if(isVerified){
                    
                axios.post(mainurl+'/api/cdm/', data)
                .then(response => {
                    const cdmdata = response.data;

                    this.setState({
                        finish : true,
                        formshow : false,
                        total : cdmdata.total,
                        cdmid : "ID : "+cdmdata.cdm.id,
                    })
                }).catch(e => {
                    console.log(e);
                })
            }else{
                alert("Error ReCaptcha")
            }   
        } catch (e) {
            console.log(e) 
        }
    }

    render() {
        const { total, hide, needsupport, ministryitem, stateitem, namereq, phonereq, filereq, other, otherreq, finish, cdmid, formshow, group, groupmember, groupmemberreq } = this.state;
        const ministrylist = ministry.map((item) => {
            return (
                <option value={item.name}>{item.name}</option>
            )
        });
        const department = ministry.filter(type => {
            return type.name === ministryitem;
        })
        const departmentlist = department.map((item) => {
            const list = item.departments.map((itemlist) =>{
                return (
                    <option value={itemlist.name}>{itemlist.name}</option>
                )
            })
            return list;
        });

        const statelist = myanmarstate.map((item) => {
            return (
                <option value={item.name}>{item.name}</option>
            )
        });
        const township = myanmarstate.filter(type => {
            return type.name === stateitem;
        })
        const townshiplist = township.map((item) => {
            const list = item.townships.map((itemlist) =>{
                return (
                    <option value={itemlist.township_mm}>{itemlist.township_mm}</option>
                )
            })
            return list;
        });
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
                                { hide &&
                                <div className="col-12 text-center">
                                    <h2 className="text-4 font-weight-500 text-white">ပြည်သူ့ဝန်ထမ်း အရေအတွက်</h2>
                                    <h1 className="text-9 font-weight-500 text-white">{total}</h1>
                                </div>
                                }
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
                                            <label htmlFor="ministryname"> ဝန်ကြီးဌာန (Ministry Name) *</label>
                                            <select id="ministryname" className="form-control" required value={this.state.ministryitem} onChange={this.ministryHandler} >
                                                <option value="">Choose Ministry Name</option>
                                                {ministrylist}
                                            </select>
                                        </div>
                                        <div className="icon-text-color contact-input-style">
                                            <label htmlFor="department"> ဌာန (Department) *</label>
                                            <select id="department" className="form-control" required value={this.state.departmentitem} onChange={this.departmentHandler}>
                                                <option value="">Choose Department Name</option>
                                                {departmentlist}
                                            </select>
                                        </div>
                                        <div className="icon-text-color contact-input-style">
                                            <label htmlFor="title"> ရာထူး (Title) </label>
                                            <input type="text" className="form-control rounded" id="title" value={this.state.title} onChange={this.titleHandler} placeholder="သင့်ရာထူးဖြည့်ပါ"/>
                                        </div>
                                        <div className="icon-text-color contact-input-style">
                                            <label htmlFor="state"> ပြည်နယ် (State) *</label>
                                            <select id="state" className="form-control" required value={this.state.stateitem} onChange={this.stateHandler}>
                                                <option value="">Choose State</option>
                                                {statelist}
                                            </select>
                                        </div>
                                        <div className="icon-text-color contact-input-style">
                                            <label htmlFor="township"> မြို့နယ် (Township) *</label>
                                            <select id="township" className="form-control" required value={this.state.townshipitem} onChange={this.townshipHandler}>
                                                <option value="">Choose Township</option>
                                                {townshiplist}
                                            </select>
                                        </div>
                                        <div className="form-check icon-text-color">
                                            <input className="form-check-input" type="checkbox" id="group" value={this.state.group} onChange={this.groupHandler}/>
                                            <label className="form-check-label" htmlFor="group">
                                                အဖွဲ့ဟုတ်ပါသလား။
                                            </label>
                                        </div>
                                        { group &&
                                        <>
                                        <div className="icon-text-color contact-input-style">
                                            <label htmlFor="groupmember"> အဖွဲ့ဝင်အရေအတွက် (Member Count) * </label>
                                            <input type="number" min="1" className="form-control rounded" id="groupmember" value={this.state.groupmember} onChange={this.groupmemberHandler} placeholder="အဖွဲ့ဝင်အရေအတွက်ဖြည့်ပါ" required={groupmemberreq}/>
                                        </div>
                                        </>
                                        }
                                        <div className="contact-textarea-style icon-text-color">
                                            <label htmlFor="notic">အကြံပြုစာ </label>
                                            <textarea id="notic" className="form-control rounded" rows="4" placeholder="သင့်အကြံပြုချက်များအားဖြည့်ပါ" value={this.state.notic} onChange={this.noticHandler}/>
                                        </div>
                                        <div className="form-check icon-text-color">
                                            <input className="form-check-input" type="checkbox" id="needsupport" value={this.state.needsupport} onChange={this.needsupportHandler}/>
                                            <label className="form-check-label" htmlFor="needsupport">
                                                အထောက်အပံ့လိုအပ်ပါသလား။
                                            </label>
                                        </div>
                                        { needsupport &&
                                        <>
                                        <div className="icon-text-color contact-input-style">
                                            <label htmlFor="name"> နာမည် (Name) * </label>
                                            <input type="text" className="form-control rounded" id="name" value={this.state.name} onChange={this.nameHandler} placeholder="သင့်နာမည်ဖြည့်ပါ" required={namereq}/>
                                        </div>
                                        <div className="icon-text-color contact-input-style">
                                            <label htmlFor="phone"> ဖုန်းနံပါတ် (English Number ဖြင့်ရိုက်ရန်) * </label>
                                            <input type="number" className="form-control rounded" id="phone" value={this.state.phone} onChange={this.phoneHandler} placeholder="သင့်ဖုန်းနံပါတ်ဖြည့်ပါ" required={phonereq}/>
                                        </div>

                                        <div className="icon-text-color contact-input-style">
                                            <label htmlFor="imgfile"> အထောက်အထားတင်ရန် * </label>
                                            <div className="custom-file">
                                                <input type="file" className="custom-file-input rounded" id="imgfile" name="imgfile" onChange={this.handleUploadFilename} required={filereq}/>
                                                <label class="custom-file-label" for="slipfile">{this.state.fileName}</label>
                                                {this.state.fileError && <small className='text-danger'>{this.state.fileMessage}</small>}
                                            </div>
                                        </div>

                                        <div className="form-check icon-text-color">
                                            <input className="form-check-input" type="checkbox" id="safety" value={this.state.safety} onChange={this.safetyHandler}/>
                                            <label className="form-check-label" htmlFor="safety">
                                                လုံခြုံမှု
                                            </label>
                                        </div>
                                        <div className="form-check icon-text-color">
                                            <input className="form-check-input" type="checkbox" id="finance" value={this.state.finance} onChange={this.financeHandler}/>
                                            <label className="form-check-label" htmlFor="finance">
                                                ငွေကြေးအထောက်အပံ့
                                            </label>
                                        </div>
                                        <div className="form-check icon-text-color">
                                            <input className="form-check-input" type="checkbox" id="other" value={this.state.other} onChange={this.otherHandler}/>
                                            <label className="form-check-label" htmlFor="other">
                                                အခြား
                                            </label>
                                            {other &&
                                            <div className="icon-text-color other-input-style">
                                                <input type="text" className="form-control rounded" id="othername" value={this.state.othername} onChange={this.othernameHandler} placeholder="အခြား" required={otherreq}/>
                                            </div>
                                            }
                                        </div>
                                        </>
                                        }
                                        
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
                                    {finish &&
                                    <div className="container finishtitle">
                                        <div className="row finishtitle">
                                            <div className="col-12 text-center">
                                                <h1 className="text-8 font-weight-500 mb-4">သင့်ရဲ့တင်သွင်းမှု့အောင်မြင်ပါသည်</h1>
                                                <p className="text-2 line-height-4 mb-4 test-color">ဒီ ID လေးကိုမှတ်သားထားပေးပါခင်ဗျာ</p>
                                                <p className="cdmid bold text-6 line-height-4 mb-4 font-weight-500 test-color">{cdmid}</p>
                                            </div>
                                        </div>
                                    </div>
                                    }
                                </div>
                            </div>
                            <div className="col-xl-5 d-none d-sm-block"> 
                                <img className="img-fluid rounded-lg shadow-lg" src="images/img2.jpeg" /> 
                            </div>
                        </div>
                        <hr className="rowlist"/>
                        <div className="row">
                            { hide &&
                            <div className="col-12">
                                <iframe width="100%" height="373" src={reporturl}  frameBorder={0} style={{border: 0}} allowFullScreen aria-hidden="false" tabIndex={0}></iframe>
                            </div>
                            }
                            <div className="col-12">
                                <div className="reportlink text-center">
                                    <a href={reporturl} className="relink text-6 font-weight-500 line-height-4 mb-4"> Report Full Screen </a>
                                </div>
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
