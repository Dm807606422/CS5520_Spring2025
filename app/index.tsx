import { StatusBar } from "expo-status-bar";
import {
    StyleSheet,
    View,
    Text,
    Button,
    SafeAreaView,
    ScrollView,
    FlatList,
    Alert,
} from "react-native";
import Header from "@/componant/Header";
import Input from "../componant/Input";
import { useEffect, useState } from "react";
import GoalItem from "../componant/GoalItem";
import { GoalData, writeToDB, deleteFromDB } from "../Firebase/firestoreHelpers";
import { collection, onSnapshot } from "firebase/firestore";
import { database } from "../Firebase/firebaseSetup";
import PressableButton from "@/componant/PressableButton";

export interface GoalFromDB extends GoalData {
    id: string;
}

export default function App() {
    const appName = "My Awesome App";
    const [goals, setGoals] = useState<GoalFromDB[]>([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    useEffect(() => {
        //start the listener on real time changes on goals collection
        const unsubscribe = onSnapshot(
            collection(database, "goals"),
            (querySnapshot) => {
                //check if the querySnapshot is empty
                if (querySnapshot.empty) {
                    setGoals([]);
                } else {
                    let newArrayOfGoals: GoalFromDB[] = [];
                    querySnapshot.forEach((docSnapshot) => {
                        console.log(docSnapshot.id);
                        newArrayOfGoals.push({
                            ...(docSnapshot.data() as GoalData),
                            id: docSnapshot.id,
                        });
                    });
                    console.log("newArrayOfGoals", newArrayOfGoals);
                    setGoals(newArrayOfGoals);
                }
            }
        );
        //return a cleanup function to stop the listener
        return () => {
            unsubscribe();
        };
    }, []);
    function handleDeleteGoal(deletedId: string) {
        //which goal was deleted?
        //I need to update the goals array by removing the goal
        //filter out the goal with the id that was passed

        // setGoals((prevGoals) => {
        //   return prevGoals.filter((goalObj) => {
        //     return goalObj.id !== deletedId;
        //   });
        // });
        //delete from db
        //call the function from firestoreHelper
        deleteFromDB(deletedId, "goals");
    }
    function handleInputData(data: string) {
        // this function will receive data from Input
        console.log("data received from Input ", data);
        //store the data in the state variable
        // setReceivedData(data);
        //close the modal
        // define a variable of type Goal object
        let newGoal: GoalData = { text: data };
        // write to db by calling the functionf rom firestoreHelper
        writeToDB(newGoal, "goals");
        //update it with the data received from Input and a random number
        // add the object to the goals array
        // use updater function in setState whenever you are
        // updating the state based on the previous state
        // setGoals((currGoals) => {
        //   return [...currGoals, newGoal];
        // });
        setIsModalVisible(false);
    }
    function dismissModal() {
        setIsModalVisible(false);
    }
    function deleteAll() {
        Alert.alert("Delete All", "Are you sure you want to delete all goals?", [
            {
                text: "Yes",
                onPress: () => {
                    setGoals([]);
                },
            },
            { text: "No", style: "cancel" },
        ]);
    }
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="auto" />
            <View style={styles.topContainer}>
                <Header name={appName} />
                <Input
                    textInputFocus={true}
                    inputHandler={handleInputData}
                    modalVisible={isModalVisible}
                    dismissModal={dismissModal}
                />
                <PressableButton pressedHandler={() => setIsModalVisible(true)}>
                    <Text style={styles.addGoalButton}>Add a Goal</Text>
                </PressableButton>
                {/* <Button title="Add a Goal" onPress={() => setIsModalVisible(true)} /> */}
            </View>
            <View style={styles.bottomContainer}>
                <FlatList
                    ItemSeparatorComponent={({ highlighted }) => (
                        <View
                            style={{
                                height: 5,
                                backgroundColor: highlighted ? "blue" : "gray",
                            }}
                        />
                    )}
                    ListEmptyComponent={
                        <Text style={styles.header}>No goals to show</Text>
                    }
                    ListHeaderComponent={
                        goals.length > 0 ? (
                            <Text style={styles.header}>My Goals List</Text>
                        ) : null
                    }
                    ListFooterComponent={
                        goals.length ? (
                            <Button title="Delete all" onPress={deleteAll} />
                        ) : null
                    }
                    contentContainerStyle={styles.centeredHorizontal}
                    data={goals}
                    renderItem={({ item, separators }) => {
                        //pass the received item to GoalItem component as a prop
                        return <GoalItem goalObj={item} deleteHandler={handleDeleteGoal} separators={separators}/>;
                    }}
                />
                {/* <ScrollView contentContainerStyle={styles.centeredHorizontal}>
          {goals.map((goalObj) => {
            return (
              <View key={goalObj.id}>
                <Text style={styles.text}>{goalObj.text} </Text>
              </View>
            );
          })}
        </ScrollView> */}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 2,
        backgroundColor: "#fff",
        // alignItems: "center",
        justifyContent: "center",
    },
    topContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "space-around",
    },
    bottomContainer: {
        flex: 4,
        backgroundColor: "#dcd",
        // alignItems: "center",
    },
    centeredHorizontal: {
        alignItems: "center",
    },
    header: {
        color: "indigo",
        fontSize: 25,
        marginTop: 10,
    },
    addGoalButton: {
        padding: 5,
        fontSize: 15,
        color: "white",
    },
});