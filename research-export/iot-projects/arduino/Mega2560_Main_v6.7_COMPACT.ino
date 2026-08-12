/* Smart Parking + Safety System v6.7 (COMPACT) */
#include <Servo.h>
#include <Wire.h>
#include <LiquidCrystal_I2C.h>

Servo eServo, xServo, mServo;
LiquidCrystal_I2C lcd(0x27, 20, 4);

const int EP=52, XP=4, GP=A9, GD=41, VP=A10, TP=A2;
const int ES=53, XS=3, MS=11, RL=25, BZ=8;
const int MX=9, DD=2000, TD=500, GT=400;
const long SI=1000, VO=10000, VC=5000;

int vC=0, eMC=0, xMC=0;
bool eR=false, xR=false;
unsigned long eT=0, xT=0, sT=0, tT=0, gS=0, vS=0, vDT=0, vCE=0, lS=0;
int lS2=-1, gDS=HIGH, vL=0;
bool gA=false, vA=false, vIC=false, wGA=false, lTS=false;
float sG=0, sV=0;
String pL0="",pL1="",pL2="",pL3="",bS="WAIT",cB="";

void beep(int f, int d){ tone(BZ,f,d); delay(d); }

void pL(int r, String t){
  String *p=NULL;
  if(r==0)p=&pL0; else if(r==1)p=&pL1; else if(r==2)p=&pL2; else if(r==3)p=&pL3;
  if(p && t!=*p){ while(t.length()<20)t+=' '; lcd.setCursor(0,r); lcd.print(t); *p=t; }
}

void mMove(int from, int to, Servo &s, int d=15){
  if(from<to) for(int a=from;a<=to;a+=2){s.write(a);delay(d);}
  else for(int a=from;a>=to;a-=2){s.write(a);delay(d);}
}

void toggleSD(){
  int a=mServo.read(); bool o=(a>90);
  if(o){ mMove(180,0,mServo); pL(2,"Security: LOCKED  "); beep(600,100); }
  else { mMove(0,180,mServo); pL(2,"Security: OPEN!   "); beep(1000,100); }
}

void readTouch(){
  if(vDT>0||gA)return;
  bool c=(digitalRead(TP)==HIGH);
  if(c!=lTS && millis()-tT>TD){ tT=millis(); lTS=c; toggleSD(); }
}

void hEntry(){
  if(eR||vC>=MX)return;
  vC++; eMC++;
  for(int i=0;i<3;i++){beep(800,150);delay(100);}
  mMove(0,90,eServo,30); digitalWrite(RL,HIGH); delay(3000);
  mMove(90,0,eServo,30); digitalWrite(RL,LOW);
  for(int i=0;i<2;i++){beep(500,150);delay(100);}
}

void hExit(){
  if(xR||vC<=0)return;
  vC--; xMC++;
  for(int i=0;i<3;i++){beep(800,150);delay(100);}
  mMove(0,90,xServo,30); digitalWrite(RL,HIGH); delay(3000);
  mMove(90,0,xServo,30); digitalWrite(RL,LOW);
  for(int i=0;i<2;i++){beep(500,150);delay(100);}
}

void readGas(){
  int r=analogRead(GP); gDS=digitalRead(GD);
  sG=sG*0.9+r*0.1;
  bool n=(sG>GT)&&(gDS==LOW);
  if(n){ if(gS==0)gS=millis(); else if(millis()-gS>=1000)gA=true; }
  else { gS=0; gA=false; }
}

void readVib(){
  if(vIC){ if(millis()>=vCE){vIC=false;vL=0;} return; }
  if(vDT>0)return;
  int r=analogRead(VP); sV=sV*0.9+r*0.1;
  vL=(sV>=800)?3:(sV>=600)?2:(sV>=400)?1:0;
  if(vL>=3){ if(vS==0)vS=millis(); else if(millis()-vS>=1000)vA=true; }
  else { vS=0; vA=false; }
}

void handleVib(){
  if(vA){
    vA=false; vS=0; vDT=millis();
    mMove(0,90,eServo,30); mMove(0,90,xServo,30); mMove(0,180,mServo);
    digitalWrite(RL,HIGH); tone(BZ,1000);
    pL(0," !! EARTHQUAKE !!"); pL(1,"  EVACUATE NOW!  ");
  }
  if(vDT>0 && millis()-vDT>=VO){
    vDT=0;
    eServo.write(0); xServo.write(0); mMove(180,0,mServo);
    digitalWrite(RL,LOW); noTone(BZ);
    eMC=0;xMC=0;eR=false;xR=false; vIC=true; vCE=millis()+VC;
  }
}

void handleGas(bool a){
  if(a){
    wGA=true;
    mMove(0,90,eServo,30); mMove(0,90,xServo,30); mMove(0,180,mServo);
    digitalWrite(RL,HIGH); tone(BZ,1500);
    pL(0,"  !! GAS LEAK !!"); pL(1,"Lv:"+String((int)sG)+" EVACUATE!");
  } else if(wGA){
    wGA=false;
    eServo.write(0); xServo.write(0); mMove(180,0,mServo);
    digitalWrite(RL,LOW); noTone(BZ);
    eMC=0;xMC=0;eR=false;xR=false;
  }
}

void checkRest(){
  if(eMC>=5)eR=true; if(xMC>=5)xR=true;
  if(eR||xR){ pL(0," System Cooling   "); pL(1," Please wait...   "); delay(10000);
    eR=false;xR=false;eMC=0;xMC=0; }
}

void uD(unsigned long ct){
  unsigned long e=ct-sT;
  int d=e/86400000, h=(e%86400000)/3600000, m=(e%3600000)/60000, s=(e%60000)/1000;
  String l0="C:"+String(vC)+"/"+String(MX)+" D:";
  if(d<100)l0+="0"; if(d<10)l0+="0"; l0+=String(d); l0+=(s%2==0)?" ":".";
  String l1=""; if(h<10)l1+="0"; l1+=String(h)+":"; if(m<10)l1+="0";
  l1+=String(m)+":"; if(s<10)l1+="0"; l1+=String(s);
  l1+=(s%4==0)?" <":(s%4==1)?" v":(s%4==2)?" >":" ^";
  l1+=" F:"+String(MX-vC);
  String l2="G:"+String((int)sG)+(gA?" ALARM":" OK    ")+" V:"+String(vL);
  String l3="Touch:"+(lTS?"ON ":"OFF")+" Br:"+bS;
  pL(0,l0); pL(1,l1); pL(2,l2); pL(3,l3);
}

void sendData(){
  if(millis()-lS<SI)return; lS=millis();
  Serial1.println("CAR:"+String(vC)+"|MAX:"+String(MX)+"|GAS:"+String((int)sG)
    +"|GA:"+(gA?1:0)+"|GD:"+((gDS==LOW)?1:0)+"|VA:"+(vA?1:0)+"|VL:"+String(vL)
    +"|EG:"+((eServo.read()>45)?1:0)+"|XG:"+((xServo.read()>45)?1:0)
    +"|SD:"+((mServo.read()>90)?1:0)+"|RL:"+(digitalRead(RL)?1:0)
    +"|TS:"+(lTS?1:0));
}

void procCmd(String cmd){
  Serial1.println("CMD:OK:"+cmd);
  if(cmd=="OPEN_ENTRY"){
    if(gA||vA||vDT)Serial1.println("CMD:FAIL:ALARM");
    else if(eR)Serial1.println("CMD:FAIL:COOLING");
    else if(vC>=MX){Serial1.println("CMD:FAIL:FULL");pL(0,"   PARK FULL!     ");delay(2000);}
    else{Serial1.println("CMD:RUN:"+cmd);hEntry();}
  }
  else if(cmd=="OPEN_EXIT"){
    if(gA||vA||vDT)Serial1.println("CMD:FAIL:ALARM");
    else if(xR)Serial1.println("CMD:FAIL:COOLING");
    else if(vC<=0)Serial1.println("CMD:FAIL:EMPTY");
    else{Serial1.println("CMD:RUN:"+cmd);hExit();}
  }
  else if(cmd=="OPEN_SECURITY"){mMove(0,180,mServo);}
  else if(cmd=="CLOSE_SECURITY"){mMove(180,0,mServo);}
  else if(cmd=="LIGHT_ON")digitalWrite(RL,HIGH);
  else if(cmd=="LIGHT_OFF")digitalWrite(RL,LOW);
  else if(cmd=="BUZZER_ON")tone(BZ,1000);
  else if(cmd=="BUZZER_OFF")noTone(BZ);
  else if(cmd.startsWith("SYSTEM:READY"))bS="CONNECTED";
  else if(cmd.startsWith("WIFI:"))bS=cmd.substring(5);
}

void setup(){
  Serial1.begin(9600);
  eServo.attach(ES); xServo.attach(XS); mServo.attach(MS);
  eServo.write(0); xServo.write(0); mServo.write(0);
  pinMode(EP,INPUT); pinMode(XP,INPUT); pinMode(GP,INPUT);
  pinMode(GD,INPUT); pinMode(VP,INPUT); pinMode(TP,INPUT);
  pinMode(RL,OUTPUT); pinMode(BZ,OUTPUT);
  digitalWrite(RL,LOW); noTone(BZ);
  lcd.init(); lcd.backlight(); lcd.clear();
  sT=millis(); sG=analogRead(GP); sV=analogRead(VP);
  lTS=(digitalRead(TP)==HIGH);
  lcd.setCursor(1,0); lcd.print("Smart Parking v6.7");
  lcd.setCursor(0,2); lcd.print("Touch:A2 OK"); delay(2000); lcd.clear();
}

void loop(){
  unsigned long ct=millis();
  while(Serial1.available()>0){
    char c=Serial1.read();
    if(c=='\n'||c=='\r'){if(cB.length()>0){cB.trim();procCmd(cB);cB="";}}
    else if(cB.length()<32)cB+=c;
  }
  readGas(); readVib(); readTouch();
  bool a=gA; handleVib(); handleGas(a);
  int s=(ct-sT)/1000;
  if(s!=lS2){lS2=s; if(!a&&!vA&&!vDT)uD(ct);}
  if(!a&&!vA&&!vDT){
    if(digitalRead(EP)==LOW&&ct-eT>DD){hEntry();eT=ct;}
    if(digitalRead(XP)==LOW&&ct-xT>DD){hExit();xT=ct;}
    checkRest();
  }
  sendData(); delay(30);
}
