import React, { useState } from 'react'; // useStateをインポート
 import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Alert,
    Image,
    Keyboard,
    TouchableWithoutFeedback,
    ScrollView,
    Modal,
  } from "react-native";
  import { Picker } from '@react-native-picker/picker';


 const CustomDropdown = ({ 
     isVisible, 
     onClose, 
     options, 
     onSelect, 
     placeholder, 
     selectedValue,
     disabled = false 
   }: CustomDropdownProps) => (
     <Modal
       visible={isVisible}
       transparent={true}
       animationType="fade"
       onRequestClose={onClose}
     >
       <TouchableWithoutFeedback onPress={onClose}>
         <View style={styles.modalOverlay}>
           <TouchableWithoutFeedback>
             <View style={styles.modalContent}>
               <View style={styles.dropdownHeader}>
                 <Text style={styles.dropdownHeaderText}>{placeholder}</Text>
               </View>
               <View style={styles.optionsContainer}>
                 <ScrollView 
                   style={styles.optionsList}
                   showsVerticalScrollIndicator={true}
                 >
                   {options.map((option) => (
                     <TouchableOpacity
                       key={option}
                       style={[
                         styles.optionItem,
                         selectedValue === option && styles.selectedOption
                       ]}
                       onPress={() => onSelect(option)}
                     >
                       <Text style={[
                         styles.optionText,
                         selectedValue === option && styles.selectedOptionText
                       ]}>
                         {option}
                       </Text>
                     </TouchableOpacity>
                   ))}
                 </ScrollView>
                 <View style={styles.scrollIndicator}>
                   <Text style={styles.scrollIndicatorText}>▼ スクロールして続きを表示 ▼</Text>
                 </View>
               </View>
             </View>
           </TouchableWithoutFeedback>
         </View>
       </TouchableWithoutFeedback>
     </Modal>
   );
   
              const styles = StyleSheet.create({
                scrollViewContent: {
                  flexGrow: 1,
                },
                container: {
                  flex: 1,
                  paddingTop: 40,
                  paddingLeft: 10,
                  paddingRight: 10,
                  backgroundColor: "#F9F9F9",
                },
                formContainer: {
                  backgroundColor: "#FFF",
                  padding: 20,
                  borderRadius: 10,
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.1,
                  shadowRadius: 5,
                  elevation: 3,
                },
                label: {
                  fontSize: 16,
                  fontWeight: "600",
                  marginBottom: 4,
                  color: "#333",
                },
                disabledText: {
                  color: '#999',
                },
                dropdownButton: {
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  backgroundColor: '#FFF',
                  borderWidth: 1,
                  borderColor: '#DDD',
                  borderRadius: 8,
                  padding: 12,
                  marginBottom: 16,
                },
                dropdownButtonText: {
                  fontSize: 16,
                  color: '#333',
                },
                dropdownIcon: {
                  fontSize: 14,
                  color: '#666',
                },
                disabledDropdown: {
                  backgroundColor: '#F5F5F5',
                  borderColor: '#E0E0E0',
                },
                input: {
                  backgroundColor: "#FFF",
                  borderColor: "#DDD",
                  borderWidth: 1,
                  borderRadius: 8,
                  padding: 12,
                  marginBottom: 16,
                  fontSize: 16,
                  color: '#333',
                },
                textArea: {
                  height: 100,
                  textAlignVertical: "top",
                  paddingTop: 12,
                  backgroundColor: "#FFF",
                  color: "#333",
                },
                imageContainer: {
                  flexDirection: "row",
                  flexWrap: "wrap",
                  marginTop: 10,
                },
                imageWrapper: {
                  position: "relative",
                  marginRight: 10,
                  marginBottom: 10,
                },
                image: {
                  width: 100,
                  height: 100,
                  borderRadius: 8,
                },
                removeButton: {
                  position: "absolute",
                  top: -5,
                  right: -5,
                  backgroundColor: "#FF5A5F",
                  borderRadius: 12,
                  width: 24,
                  height: 24,
                  justifyContent: "center",
                  alignItems: "center",
                },
                removeButtonText: {
                  color: "#FFF",
                  fontWeight: "bold",
                  fontSize: 16,
                },
                addButton: {
                  width: 100,
                  height: 100,
                  borderWidth: 1,
                  borderColor: "#DDD",
                  borderRadius: 8,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#FFF",
                },
                addButtonText: {
                  color: "#333",
                  fontSize: 14,
                },
                submitButton: {
                  backgroundColor: "#FF5A5F",
                  paddingVertical: 12,
                  borderRadius: 8,
                  alignItems: "center",
                  marginBottom: 12,
                  width: "30%",
                  alignSelf: "flex-end",
                  shadowColor: "#FF5A5F",
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.2,
                  shadowRadius: 6,
                  elevation: 5,
                },
                submitButtonText: {
                  color: "#FFF",
                  fontWeight: "bold",
                  fontSize: 16,
                },
                modalOverlay: {
                  flex: 1,
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: 20,
                },
                modalContent: {
                  backgroundColor: '#FFF',
                  borderRadius: 12,
                  width: '100%',
                  maxHeight: '90%',
                  padding: 0,
                  overflow: 'hidden',
                },
                dropdownHeader: {
                  padding: 15,
                  borderBottomWidth: 1,
                  borderBottomColor: '#E0E0E0',
                  backgroundColor: '#F8F8F8',
                },
                dropdownHeaderText: {
                  fontSize: 16,
                  fontWeight: '600',
                  color: '#333',
                  textAlign: 'center',
                },
                optionsContainer: {
                  position: 'relative',
                  maxHeight: 660,
                },
                optionsList: {
                  maxHeight: 600,
                },
                optionItem: {
                  padding: 15,
                  height: 50,
                  borderBottomWidth: 1,
                  borderBottomColor: '#F0F0F0',
                  backgroundColor: '#FFF',
                  justifyContent: 'center',
                },
                optionText: {
                  fontSize: 16,
                  color: '#333',
                },
                selectedOption: {
                  backgroundColor: '#F8F8F8',
                },
                selectedOptionText: {
                  color: '#FF5A5F',
                  fontWeight: 'bold',
                },
                scrollIndicator: {
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  paddingVertical: 8,
                  borderTopWidth: 1,
                  borderTopColor: '#F0F0F0',
                },
                scrollIndicatorText: {
                  textAlign: 'center',
                  color: '#666',
                  fontSize: 12,
                },
              });