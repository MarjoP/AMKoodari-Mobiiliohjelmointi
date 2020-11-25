import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, Alert, Animated, } from 'react-native';
import { Input, Button, Icon } from 'react-native-elements';
import * as Speech from 'expo-speech';
import Icons from '../icons.js';
import { TouchableHighlight } from 'react-native-gesture-handler';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('memoryGameScores1.db');

export default function RepeatScreen() {

    const [round, setRound]=useState(1);
    const [rplayer, setrPlayer] = useState("");
    const [score, setScore]=useState(0);
    const [allIcons, setAllIcons]=useState([]);
    const [currentItems, setCurrentItems]=useState([]);
    const [wordAmount, setWordAmount] = useState(3);
    const [shuffledIcons, setShuffledIcons] = useState([]);
    const [update, setUpdate] = useState();
    const [animation, setAnimation] = useState(new Animated.Value(0));
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [clicked, setClicked] = useState([]);
    const [playingDate, setDate] = useState ('');


    //tietokanta/tulosten tallennus
    useEffect(() => {
        db.transaction(tx => {
            tx.executeSql('create table if not exists repeatGameScores (id integer primary key not null, player text, score int, date text, level text);');
        }, (error => {console.log("could not create rdatabase" +error)}))
    }, []);

    const saveScore = (recentScore) => {
        db.transaction(tx => {
            tx.executeSql('insert into repeatGameScores (player, score, date, level) values(?, ?, ?, ?);',
            [rplayer, parseInt(recentScore), playingDate, round.toString()]);
        },(error => {console.log("could not save scores" +error)}))
    }

    //pelin alustusta
    useEffect (() => {
        setAllIcons(Icons);
        var dateToday = new Date();
        var date = dateToday.getDate() +"." +(parseInt(dateToday.getMonth()) +1) +"." +dateToday.getFullYear();
        setDate(date.toString());
    }, [])
        
    useEffect (() => {
        showGameboard();
    }, [shuffledIcons])

    //animaatiot
    const anim = () => {
        Animated.timing(animation, {
            toValue:0,
            duration: 1,
            useNativeDriver:false
        }).start(() => {
            Animated.timing(animation, {
                toValue:1,
                delay:2300,
                duration: 6000,
                useNativeDriver: false
              }).start();
        });
    }

    const boxInterpolation =  animation.interpolate({
        inputRange: [0, 1],
        outputRange:[0, 1]
      })

    const bgAnim = animation.interpolate({
        inputRange: [0, 1],
        outputRange:['#ff9cf5', '#140b42']
      })

    const animatedStyle = {
        opacity: boxInterpolation,
        backgroundColor:bgAnim
      }

    //vaikeusasteen lisääminen
    useEffect(()=> {
        if(round%3==0 && wordAmount<30)
        {
            setWordAmount(wordAmount +1);
        }
    }, [round])

    //seuraavalle kierrokselle pääsy
   useEffect(() => {
        if(clicked.length>=wordAmount){
            setRound(round+1);
        Alert.alert("CONGRATULATIONS! \n You made it to the next round! \n\nClick 'Start new round' when you are ready.");
        setShuffledIcons([]);
        setButtonDisabled(false)}
    }, [clicked])

    //pelinäkymä
    const showGameboard = () => {
        return (
            <Animated.View style={{...styles.gameboard, ...animatedStyle}}>
                <FlatList 
                    horizontal={false}
                    numColumns={4}
                    extraData={update}
                    keyExtractor={item => item.name.toString()} 
                    renderItem={({item, index}) => 
                        <View style={{flex:0.25, alignItems:'center'}}>
                            <TouchableHighlight
                            underlayColor="#84fc03"
                            activeOpacity={0.6}
                            onPress={() => {select(item.name)}}>
                            <Image 
                                style={{width:65, height:65, margin:3}} 
                                source={item.url} 
                            />
                            </TouchableHighlight>
                        </View>
                    }
                    data={shuffledIcons} 
                />
                </Animated.View>
        ) 
    }

    //kierroksen kuvien valinta 
    const selectWords = () => {
        return new Promise((resolve, reject) => {
        var allWords = shuffleArray([...allIcons]);
        var finalWords =[];
        for(var i=0; i<wordAmount; i++)
        {
            finalWords.push(allWords[i]);
        }
        setCurrentItems(finalWords);
        resolve(finalWords);
    });
    }
    //valittujen kuvien luku ääneen
    const speakWords = (items) => {
        return new Promise((resolve, reject) => { 
            var arra = [];
            for(var i=0; i<items.length; i++)
            {
                Speech.speak(items[i].name, {language:'en'});
            }
            resolve(items);
        });
    }

    //uuden kierroksen aloitus
    const startNewRound = () => {
        if(rplayer=="")
        {setrPlayer("anonymous");}
        anim();
        setClicked([]);
        setShuffledIcons([]);
        setButtonDisabled(true);
        selectWords().then(result => {
            speakWords(result)
            .then(result  => {
                console.log(result.length);
                var shuff = shuffleArray([...result]);
                setShuffledIcons(shuff);
            });
        });
    }

    //taulukon sekoitus
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

    //käyttäjän vastauksen arviointi
    const select = (item) => {
        if(item == currentItems[clicked.length].name)
        {
            setScore (score +1);
            setClicked([...clicked, item]);
        }
        else {
            endGame();
        }
    }

    //pelin päättäminen
    const endGame = () => {
        saveScore(score);
        Alert.alert("GAME OVER \n Your score is: "+score +"! \n\nPlay again and beat your best score!");
        setScore(0);
        setWordAmount(3);
        setShuffledIcons([]);
        setRound(1);
        setButtonDisabled(false);
    }

return (
<View style={styles.container}>

    <View style={styles.topCont}>
        <View style={{flex:2}}>
            <Input 
             labelStyle={{color:'#d9024d'}}
                containerStyle={{width:170}}
                placeholder = 'name' label='PLAYER' onChangeText={(name) => setrPlayer(name)} value = {rplayer}></Input>
        </View>
        <View style={{flex:1, alignItems:'center'}}>
            <Text>Round:</Text>
            <View style={styles.ball}>
                <Text style={styles.text}>{round}</Text>
            </View>
        </View>
        <View style={{flex:1, alignItems:'center'}}>
            <Text>Correct items:</Text>
            <View style={styles.ball}>
                <Text style={styles.text}>{score}</Text>
            </View>
        </View>
    </View>

    <View style={styles.textCont}>
        <Text style={{fontSize:18}}>Listen carefully and memorize the order of the items you hear. Then click on the items in correct order. Game ends after the first wrong answer.</Text>
    </View>
    
    <View style={{flex:5, backgroundColor:'#ff9cf5', borderColor:'#d9024d', borderWidth:1, width: '98%', marginLeft:5, marginRight:5, padding:5, alignItems:'center'}}>
        {showGameboard()} 
    </View>

    <View style={styles.bottom}>
    <Button title="Start new round"
            type = "solid"
            disabled ={buttonDisabled}
            titleStyle={{color:'#140b42'}}
            buttonStyle={{backgroundColor:'#04de00', borderWidth:3, borderColor:'#d9024d', width:150, height:70, justifyContent:'center', borderRadius:10}}
           onPress = {startNewRound}
            />
    </View>
</View>
);
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F4F3F4',
      alignItems: 'center',
      justifyContent:'flex-start',
      marginBottom:3,
      paddingBottom:3,
    },
    topCont: {
        flex:1,
        flexDirection:'row',
        marginTop:10, 
        marginBottom:10,    
        padding:3,
    },
    top: {
        flex:1,
    },
    ball: {
        borderRadius:25,
        backgroundColor:'#d9024d',
        width:50,
        height:40,
        justifyContent:'center', 
        alignItems:'center'
    },
    text: {
        fontSize:16
    },
    gameboard: {
        flexWrap:'wrap',
        flexDirection:'row',
        width:'98%',
        backgroundColor:'#ff9cf5',
        flex:6,
        marginBottom:5,
        opacity:0,
    },
    textCont: {
        padding:5,
        margin:3,
        paddingTop:8,
        flex:2,
        backgroundColor:'#04de00',
        borderWidth:2,
        marginTop:20,
        marginBottom:10,
        borderColor:'#140b42',
    },
    bottom: {
        flex:2,
       marginBottom:2,
       marginTop:8,
    },
});
