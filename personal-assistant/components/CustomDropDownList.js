
import { View, Text, StyleSheet } from 'react-native'
import SelectDropdown from 'react-native-select-dropdown'
import Ionicons from '@expo/vector-icons/Ionicons'

export const CustomDropDownList = ({ 
  items=[{title: 'Hola'}, {title: 'Mundo'}], 
  defaultText='Seleccione',
  errorText='',
  setValue = ()=>{}
}) => {
    return (
      <View>
        <SelectDropdown
            data={ items }
            onSelect={(selectedItem, index) => {
                console.log(selectedItem, index);
                setValue( {value:selectedItem.title, error:''} )
            }}
            renderButton={(selectedItem, isOpened) => {
                return (
                    <View style={[
                      styles.dropdownButtonStyle, 
                      errorText ? styles.dropdownButtonStyleError : styles.dropdownButtonStyleDefault
                    ]}>
                        <Text style={ errorText ? styles.dropdownButtonTxtStyleError : styles.dropdownButtonTxtStyle }>
                            {(selectedItem && selectedItem.title) || defaultText }
                        </Text>

                        <Ionicons
                            name={isOpened ? 'chevron-up' : 'chevron-down'}
                            size={24}
                            color="black"
                            style={styles.dropdownButtonArrowStyle}
                        />

                    </View>
                );
            }}
            renderItem={(item, index, isSelected) => {
                return (
                    <View style={{ ...styles.dropdownItemStyle, ...(isSelected && { backgroundColor: '#D2D9DF' }) }}>
                        <Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
                    </View>
                );
            }}
            showsVerticalScrollIndicator={false}
            dropdownStyle={styles.dropdownMenuStyle}
        />
        {
          errorText && 
          <Text style={styles.error}>{errorText}</Text>
        }
      </View>
    )
}

const styles = StyleSheet.create({
  dropdownButtonStyle: {
    width: 300,
    height: 60,
    backgroundColor: '#E9ECEF',
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
    marginVertical: 10
  },
  dropdownButtonStyleDefault:{
    borderColor: "#0000008a",
    borderWidth: 1,
  },
  dropdownButtonStyleError:{
    borderColor: "#b00020",
    borderWidth: 2,
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 18,
    color: '#151E26',
  },
  dropdownButtonTxtStyleError: {
    flex: 1,
    fontSize: 18,
    color: '#b00020',
  },
  dropdownButtonArrowStyle: {
    fontSize: 28,
  },
  dropdownButtonIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
  dropdownMenuStyle: {
    backgroundColor: '#E9ECEF',
    borderRadius: 8,
  },
  dropdownItemStyle: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    color: '#151E26',
  },
  dropdownItemIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
  error: {
    color: 'red',
    fontSize: 13,
    paddingTop: 6
  }
})