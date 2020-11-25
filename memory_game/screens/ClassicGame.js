import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect, Component} from 'react';
import { StyleSheet, Text, View, TextInput, Button, Keyboard, FlatList, Image, Animated, Alert, Modal} from 'react-native';
import FlipCard from 'react-native-flip-card';
import * as Permissions from 'expo-permissions';
import { DeviceMotion } from 'expo-sensors';
import * as SQLite from 'expo-sqlite';
import { Audio } from 'expo-av';

const db = SQLite.openDatabase('memoryGameScores1.db');

export default function GlassicGame({route, navigation}) {
const [player, setPlayer ] = useState(route.params.player.player);
const { theme } = route.params.theme;
const { difficulty } = route.params.difficulty;
const { cards } =route.params.cards;
const [playingCards, setPlayingCards] = useState([]);
const [hasPermission, setPermission] = useState(null);
const [orientation, setOrientation] = useState(0);
const [modal2Visible, setModal2Visible] = useState(false);
const [data, setArr] = useState([]);
const [selected, setSelected] = useState([]);
const [foundPairs, setFound] = useState(0);
const [trials, addTrial] = useState(0);
const [seconds, setSeconds] = React.useState(-3);
const [modalVisible, setModalVisible] = useState(true);
const [timer, clearInterval]= useState();
const [timerState, setTimerState] = useState(true);
const [animation, setAnimation] = useState(new Animated.Value(0));
const [playingDate, setDate] = useState ('');
const [soundObj, setSoundObj] = useState(new Audio.Sound);
const [gameOn, setGameOn] = useState(false);

//ääniefektin käyttöönotto
useEffect(() => {
    try {
        Audio.setAudioModeAsync({
            allowsRecordingIOS: false,
            interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
            playsInSilentModeIOS: true,
            interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
            shouldDuckAndroid: true,
            staysActiveInBackground: true,
            playThroughEarpieceAndroid: true
          });

        async function loadSounds() {
        await soundObj.loadAsync(require('../assets/sounds/success.wav'));
        }
        loadSounds();
    } catch (error) {
    console.log("sound error...");
    }   
}, []);

const playSound = () => {
    try {
        soundObj.replayAsync();
    } catch (error) {
    }
}

//tulosten tallennus tietokantaan
useEffect(() => {
    db.transaction(tx => {
        tx.executeSql('create table if not exists classicGameScores (id integer primary key not null, player text, score int, date text, level text);');
    }, (error => {console.log("could not create database" +error)}))
}, [gameOn]);

const saveScore = (recentScore) => {
    console.log("scoreData: ")
    db.transaction(tx => {
        tx.executeSql('insert into classicGameScores (player, score, date, level) values(?, ?, ?, ?);',
        [player, parseInt(recentScore), playingDate, difficulty.diff.label]);
    },(error => {console.log("could not save scores" +error)}))
}

//pelin alustus
 useEffect(() => { 
    if (player =="" || player==undefined) {setPlayer('anonymous');}
    selectPlayingCards();
    askMotionPermission();
    var dateToday = new Date();
    var date = dateToday.getDate() +"." +(parseInt(dateToday.getMonth()) +1) +"." +dateToday.getFullYear();
    setDate(date.toString()); 
}, []);

//laitteen pysty-/vaaka-asennon tunnistus
const askMotionPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.MOTION);
    setPermission( status == 'granted' );
    }

useEffect(() => {
    if(orientation>45 || orientation <-45){
        setModal2Visible(true);
        console.log(orientation);
    } else 
    {
        setModal2Visible(false);
    }
}, [orientation]);

DeviceMotion.addListener(({orientation}) => {
    if(timerState==true){
    setOrientation(orientation);}
});

//lähtölaskenta ja ajanotto
React.useEffect(() => {
    if (seconds <0) {
      setTimeout(() => setSeconds(seconds + 1), 1000);
        if(gameOn==false) {setGameOn(true)};
    } else if(seconds <3600 && timerState){
      setModalVisible(false);
      setTimeout(() => setSeconds(seconds +1),1000);
    } else {
      //  clearInterval("");
    }
    return () => clearInterval(timer);
  },[seconds]);

//animointi parin löydyttyä
  const pairFoundAnimation = () => {
    Animated.timing(animation, {
      toValue:1,
      duration: 400,
      useNativeDriver: false
      
    }).start( () => {
      Animated.timing(animation,{
        toValue:0,
        duration: 400,
        useNativeDriver: false
      }).start();
    });
  }
  const boxInterpolation =  animation.interpolate({
    inputRange: [0, 1],
    outputRange:['rgb(217, 2, 77)' , 'rgb(78, 217, 13)']
  })
  const animatedStyle = {
    backgroundColor: boxInterpolation
  }

//korttien sekoitus satunnaiseen järjestykseen
function shuffleArray(array) {
    let i = array.length - 1;
    for (; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

//Sekoitetaan kortit, otetaan x määrä kortteja pelattavaksi (vaikeusasteen perusteella), sekoitetaan valitut kortit
const selectPlayingCards = () => {
        var cardsClone = shuffleArray([...cards]);
        var finalCards =[];

        if(difficulty.diff.label == 'Easy')
        {    
            for(var i=0; i<6; i++)
            {   
           finalCards.push(cardsClone[i]);
           finalCards.push(cardsClone[i]);
            }
        } else if (difficulty.diff.label == 'Medium')
        {
            for(var i=0; i<12; i++)
            {   
           finalCards.push(cardsClone[i]);
           finalCards.push(cardsClone[i]);
            }
        } else if (difficulty.diff.label == 'Hard')
        {
            for(var i=0; i<24; i++)
            {   
           finalCards.push(cardsClone[i]);
           finalCards.push(cardsClone[i]);
            }
        }
        finalCards=shuffleArray(finalCards);
       
        const updatedCards = finalCards.map((item) => {
            let randomKey = "_" +Math.random().toString(10).substr(2,9);
                const updatedCard = {
                    ...item, 
                    key:randomKey,
                };
                return updatedCard;
            return item;
        });

        setPlayingCards(updatedCards);

}
//pelilaudan asettelu
const layout = () => {
    switch (difficulty.diff.label)
    {
        case 'Easy': 
            return easyLayout();
            break;

        case 'Medium': 
            return mediumLayout();
            break;

        case 'Hard':
            return hardLayout();
            break;

        default:
            Alert.alert('not found');
    }
}

const easyLayout = () => {
    return (
   <View style = {styles.easy}>
        <FlatList
         data={playingCards}
            extraData={selected}
           contentContainerStyle={{marginTop:15, marginLeft:10}}
           horizontal={false}
           numColumns={3}
            renderItem={({item})=>
            <FlipCard style={styles.buttonEasy} flipHorizontal={true} flipVertical={false} flip={item.flip} clickable={item.clickable} 
            onFlipStart={(isFlipStart)=> { if(isFlipStart){turnCard(item.id, item.key)}}}>
            <View>
                <Image testId={item.id} style={{width:90, height:90, borderRadius:5, margin:3}} source={{uri:item.imagePath}}/>
            </View>
             <View style={styles.back}>
                <Text></Text>
            </View>
        </FlipCard>
        }>
    </FlatList>
    </View>
)};

const mediumLayout = () => {
    return (
    <View style = {styles.easy}>
        <FlatList
           contentContainerStyle={{margin:2, marginLeft:10, marginTop:0}}
           horizontal={false}
           numColumns={4}
            data={playingCards}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item})=>
            <FlipCard style={styles.buttonMed} flipHorizontal={true} flipVertical={false} flip={item.flip} clickable={item.clickable} onFlipStart={(isFlipStart)=> {if(isFlipStart){turnCard(item.id, item.key)}}}>
            <View>
                <Image style={{width:70, height:70, borderRadius:5, margin:3}} source={{uri:item.imagePath}}/>
            </View>
             <View style={styles.backMed}>
                <Text> </Text>
            </View>
        </FlipCard>
        }>
        </FlatList> 
    </View>
)};

const hardLayout = () => {
    return (
    <View style = {styles.easy}>
        <FlatList
           contentContainerStyle={{margin:2, marginLeft:10, marginTop:0}}
           horizontal={false}
           numColumns={6}
            data={playingCards}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item})=>
            <FlipCard style={styles.buttonHard} flipHorizontal={true} flipVertical={false} flip={item.flip} clickable={item.clickable} onFlipStart={(isFlipStart)=> {if(isFlipStart){turnCard(item.id, item.key)}}}>
            <View>
                <Image style={{width:50, height:50, borderRadius:5, margin:3}} source={{uri:item.imagePath}}/>
            </View>
             <View style={styles.backHard}>
                <Text></Text>
            </View>
        </FlipCard>
        } >
        </FlatList> 

    </View>
)};

//kortin kääntäminen
const turnCard = (cardId, cardKey) => {
    const updatedCards = playingCards.map((item) => {
        if(item.key == cardKey) {
            const updatedCard = {
                ...item, 
                clickable:false,
                flip:false
            };
            return updatedCard;
        } else {
        return item;
        }
    });
    setPlayingCards(updatedCards);
    //
    let selection = selected;
    if(selection.length == 0 || selection.some(v => v.key !=cardKey)) 
    {
        setSelected([...selected, {id:cardId, key:cardKey}]);
    } 
}

useEffect(() => {
    if(selected.length==2)
    {
        evaluate();
    }
}, [selected]);

// käännetyn korttiparin vertaaminen, löydetyn parin lukitseminen pois pelattavista korteista
const evaluate = () => {
    if(selected[0].id == selected[1].id)
    {
        setTimeout(() => {
            pairFoundAnimation();
    },500);
    playSound();

        const updatedCards = playingCards.map((item) => { 
            if(item.id == selected[0].id || item.id == selected[1].id) {
                const updatedCard = {
                    ...item, 
                    clickable:false,
                };
                return updatedCard;
            }
            return item;
        });
        setPlayingCards(updatedCards);
        setFound(state => (state+1));
        setSelected([]);
    }
    else {
        resetSelected(selected[0].key, selected[1].key);
    }
    addTrial(state => (state+1));
}

const resetSelected = (firstKey, secondKey) => {
    setTimeout(() => {
    const updatedCards = playingCards.map((item) => {
        if(item.key == firstKey || item.key ==secondKey) {
            const updatedCard = {
                ...item, 
                clickable:true,
                flip:true
            };
            return updatedCard;
        } else {
        return item;
        }
    });
    setPlayingCards(updatedCards);
}, 900);
setSelected([]);
}

//pelin loppumisen määrittely ja tulosten lasku
useEffect(() => {
    let countPairs;
    switch(difficulty.diff.label)
    {
        case 'Easy': 
            countPairs=6;
            break;

        case 'Medium': 
        countPairs=12;
            break;

        case 'Hard':
            countPairs=24;
            break;
    }

    if(foundPairs == countPairs)
    {
        let time = seconds;
        let score = 3*time + 15*trials;
        saveScore(score);
        console.log(score);
        setTimerState(false);
        soundObj.unloadAsync();
        Alert.alert("Congratulations", "You found all! Your score is: " +score, 
        [
            { text: "OK", onPress: () => setTimerState(false) }
        ]
        );
        navigation.goBack();
    }
}, [foundPairs]);

return (

<View style={styles.container}>
    <View style ={styles.topCont}>
        <View style={styles.top}>
            <Text>Found pairs</Text>
            <Animated.View style={{...styles.found, ...animatedStyle}}>
                <Text style={styles.text}>{foundPairs}</Text>
            </Animated.View>
        </View>
        <View style={styles.top}>
            <Text>Turns used:</Text>
            <View style={styles.ball}>
                <Text style={styles.text}>{trials}</Text>
            </View>
        </View>
        <View style={styles.top}>
            <Text>Time elapsed:</Text>
            <View style={styles.ball}>
                <Text style={styles.text}>{seconds}</Text>
            </View>
        </View>
        <Modal style={{alignSelf:'center', justifyContent:'center'}} animationType="slide"
        transparent={false}
        visible={modalVisible}
        contentContainerStyle={styles.countDownModal}
        >
            <Text style={{fontSize:34, alignSelf:'center', margin:50}}> Game starting in </Text>
          <View style={styles.modal}>
            <Text style={styles.modalText}>{seconds}</Text>
        </View>
        </Modal>
        <Modal animationType="slide"
        transparent={false}
        visible={modal2Visible}
        contentContainerStyle={styles.countDownModal}>
          <View style={styles.modal2}>
            <Text style={styles.modal2Text}>Turn the device!</Text>
        </View>
</Modal>
    </View>
    <View style={styles.bottomCont}>
    {layout()}
    </View>
</View>
);
}


const styles = StyleSheet.create({
    container: {
      flex:1,
      justifyContent:'flex-start',
      alignItems:'center',
      backgroundColor:'#dce5f5'
    },
    easy: {
        flex:1,
        width:340,
        justifyContent:'space-around',
        alignContent:'center',
    },
    modal: {
        alignSelf:'center',
        justifyContent:'center',
        alignItems:'center',
        width:200,
        height:200,
        margin: 20,
        backgroundColor: "#beff54",
        borderRadius: 100,
        borderWidth:3,
        borderStyle: 'solid',
        padding: 35,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    modalText: {
        fontSize:50,
    },
    modal2: {
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        alignContent:'center'
    },
    modal2Text: {
        fontSize:40,
        textAlign:'center',
        justifyContent:'center',  
    },
    buttonEasy: {
        marginTop:3,  
        marginBottom:3,
        width:90,
        height:90,
    },
    flatlist: {
        flexDirection:'column',
    },
    back: {
        backgroundColor:'#0aff33',
        margin:3,
        width:90,
        height:90,
        borderRadius:5,
        borderWidth:4,
        borderColor:'red',
    },
    backMed: {
        backgroundColor:'#0aff33',
        margin:3,
        width:70,
        height:70,
        borderRadius:5,
        borderWidth:4,
        borderColor:'red',
    },
    backHard: {
        margin:3,
        backgroundColor:'#0aff33',
        width:50,
        height:50,
        borderRadius:5,
        borderWidth:3,
        borderColor:'red',
    },
    buttonMed: {
        marginTop:3,  
        marginBottom:3,
        width:70,
        height:70,
    },
    buttonHard:{
        marginTop:3,  
        marginBottom:3,
        width:50,
        height:50,
    },
    topCont: {
        flex:1,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'flex-start',
        paddingTop:5,
        paddingLeft:30,
        paddingRight:10,
        backgroundColor:'#dce5f5',
    },
    top: {
        flex:1,
    },
    ball: {
        borderRadius:25,
        backgroundColor:'#d9024d',
        width:70,
        height:40,
        justifyContent:'center',
        
    },
    found: {
        borderRadius:25,
        backgroundColor:'#f56505',
        width:70,
        height:40,
        justifyContent:'center',
    },
    text: {
        padding:5,
        alignSelf:'center',
        fontWeight:'bold',
    },
    bottomCont: {
        flex:7,
        borderColor:'gray',
        borderWidth:1,
        marginLeft:5,
        marginRight:5,
        marginBottom:5,
        paddingTop:3,
        backgroundColor:'#ff9cf5',
    }
  });