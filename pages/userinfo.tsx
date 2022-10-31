import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Button from '@mui/material/Button';
import { color } from '@mui/system';
import { Box, colors } from '@mui/material';
import styles2 from '../styles/box.module.css'
import Script from 'next/script';
import tag from '../styles/tag.module.css'
import pic from '../styles/pic.module.css'
import position from '../styles/position.module.css'
import { AccessAlarm, ThreeDRotation } from '@mui/icons-material';
import profilePic from '../img/62649345_1245721135605302_8922629952818380800_n.jpg'
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { blue } from '@mui/material/colors';

function showtext(text) {
    return (text!=null? text : 'NULL');
  }
function entertrigger(event){
    if (event.key === "Enter") {
      }
}
function sourcecheck(input){
    return (typeof(input)=="string"? input : "/62649345_1245721135605302_8922629952818380800_n.jpg");
}
const Home: NextPage = () => {
    var source,door,gear;
    let name,w,hi,gender,age;
    return (
        <div className={styles2.cutspace}>
            <p className={styles2.blank}></p>
            <label><SettingsIcon sx={{ fontSize: 40, color: blue[800]}} href="https://www.google.com/"/><label className={styles2.whitespace}/><LogoutIcon sx={{ fontSize: 40, color: blue[800]}}/></label>
        <div className={styles2.center}>
            <div className={styles2.center}>
                <Image src={profilePic} className={pic.round} width={150} height={150}/>
                <h1 className={styles2.cutspace}>{showtext(name)}</h1>
            </div>
        <div  className={styles2.box}>
            <div>
            ข้อมูลส่วนตัว
                <div>
                ชื่อผู้ใช้งาน:
                </div>
                <div className={styles2.box2}>
                    {showtext(name)}
                </div>
                <p className={styles2.blank}></p>
                <p className={styles2.blank}></p>
                <div>
                อายุ:
                <label className={styles2.code}>{showtext(age)}</label>
                เพศ:
                <label className={styles2.code}>{showtext(gender)}</label>
                </div>
                <p className={styles2.blank}></p>
                <p className={styles2.blank}></p>
                <p className={styles2.blank}></p>
                <p className={styles2.blank}></p>
                <div>
                น้ำหนัก:
                <label className={styles2.code}>{showtext(w)}</label>
                ส่วนสูง:
                <label className={styles2.code}>{showtext(hi)}</label>
                </div>
                <p className={styles2.blank}></p>
                <div>
                รูปแบบการกิน:
                </div>
                <div className={styles2.box2}>
                <div>
                    <div className={tag.container} id="tag-container">
                        <span className={tag.dashfolio}>tag1</span>
                        <span className={tag.dashfolio}>tag2</span>
                        <span className={tag.dashfolio}>tag3</span>
                    </div>
                </div>
                </div>
                <div>
                โรคประจำตัว:
                </div>
                <div className={styles2.box2}>
                    <div className={tag.container} id="tag-container">
                        <span className={tag.dashfolio}>tag1</span>
                        <span className={tag.dashfolio}>tag2</span>
                        <span className={tag.dashfolio}>tag3</span>
                    </div>
                </div>
                <div>
                อาหารที่แพ้:
                </div>
                <div className={styles2.box2}>
                    <div className={tag.container} id="tag-container">
                        <span className={tag.dashfolio}>tag1</span>
                        <span className={tag.dashfolio}>tag2</span>
                        <span className={tag.dashfolio}>tag3</span>
                    </div>
                </div>
                <div>
                สิ่งที่หลีกเลี่ยง:
                </div>
                <div className={styles2.box2}>
                <div className={tag.container} id="tag-container">
                        <span className={tag.dashfolio}>tag1</span>
                        <span className={tag.dashfolio}>tag2</span>
                        <span className={tag.dashfolio}>tag3</span>
                        <span className={tag.dashfolio}>tag3</span>
                        <span className={tag.dashfolio}>tag3</span>
                        <span className={tag.dashfolio}>tag3</span>
                        <span className={tag.dashfolio}>tag3</span>
                        <span className={tag.dashfolio}>tag3</span>
                    </div>
                </div>
            </div>
        </div>
        </div>
        </div>
    )
}
export default Home
