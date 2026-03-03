from tkinter import *
from tkinter import messagebox
import requests

root = Tk()
root.title("Weather App")
root.geometry("450x600")
root.configure(bg="#1e3c72")

def get_weather():
    city = city_entry.get()
    
    if not city.strip():
        messagebox.showwarning("Input Error", "Please enter a city name.")
        return
    
    try:
        api = f"https://api.openweathermap.org/data/2.5/weather?q={city}&appid=97b978061c8a8e4e13f2f814cbaa43e4&units=metric"
        response = requests.get(api)
        data = response.json()
        
        if data.get("cod") != 200:
            messagebox.showerror("Error", "City not found!")
            return
        
        temp = int(data['main']['temp'])
        feels_like = int(data['main']['feels_like'])
        condition = data['weather'][0]['main']
        description = data['weather'][0]['description']
        humidity = data['main']['humidity']
        pressure = data['main']['pressure']
        wind = data['wind']['speed']
        
        city_label.config(text=city.upper())
        temp_label.config(text=f"{temp}°")
        feels_label.config(text=f"Feels like {feels_like}°C")
        condition_label.config(text=condition)
        desc_label.config(text=description.capitalize())
        humidity_value.config(text=f"{humidity}%")
        pressure_value.config(text=f"{pressure}")
        wind_value.config(text=f"{wind}")
        
    except Exception as e:
        messagebox.showerror("Error", f"Something went wrong!")

# Header
header_frame = Frame(root, bg="#2a5298", height=120)
header_frame.pack(fill=X)
header_frame.pack_propagate(False)

Label(header_frame, text="☁ Weather", font=("Segoe UI", 28, "bold"), bg="#2a5298", fg="white").pack(pady=30)

# Search Section
search_frame = Frame(root, bg="#1e3c72")
search_frame.pack(pady=25)

city_entry = Entry(search_frame, font=("Segoe UI", 14), width=22, relief=FLAT, bg="white", fg="#333")
city_entry.pack(side=LEFT, ipady=8, padx=(0, 10))
city_entry.insert(0, "Enter city name...")
city_entry.bind("<FocusIn>", lambda e: city_entry.delete(0, END) if city_entry.get() == "Enter city name..." else None)

search_btn = Button(search_frame, text="🔍", font=("Segoe UI", 14), bg="#4CAF50", fg="white", relief=FLAT, cursor="hand2", command=get_weather, width=3)
search_btn.pack(side=LEFT, ipady=8)

# Main Weather Display
main_frame = Frame(root, bg="white", relief=FLAT)
main_frame.pack(pady=10, padx=30, fill=BOTH, expand=True)

city_label = Label(main_frame, text="", font=("Segoe UI", 22, "bold"), bg="white", fg="#1e3c72")
city_label.pack(pady=(20, 5))

temp_label = Label(main_frame, text="", font=("Segoe UI", 60, "bold"), bg="white", fg="#FF6B6B")
temp_label.pack()

feels_label = Label(main_frame, text="", font=("Segoe UI", 11), bg="white", fg="#666")
feels_label.pack()

condition_label = Label(main_frame, text="", font=("Segoe UI", 18, "bold"), bg="white", fg="#333")
condition_label.pack(pady=(10, 0))

desc_label = Label(main_frame, text="", font=("Segoe UI", 12), bg="white", fg="#888")
desc_label.pack()

# Details Section
details_frame = Frame(main_frame, bg="#f5f5f5")
details_frame.pack(pady=20, padx=20, fill=X)

# Humidity
humidity_frame = Frame(details_frame, bg="#f5f5f5")
humidity_frame.pack(side=LEFT, expand=True, padx=10, pady=15)
Label(humidity_frame, text="💧", font=("Segoe UI", 20), bg="#f5f5f5").pack()
humidity_value = Label(humidity_frame, text="", font=("Segoe UI", 16, "bold"), bg="#f5f5f5", fg="#3498db")
humidity_value.pack()
Label(humidity_frame, text="Humidity", font=("Segoe UI", 9), bg="#f5f5f5", fg="#666").pack()

# Wind
wind_frame = Frame(details_frame, bg="#f5f5f5")
wind_frame.pack(side=LEFT, expand=True, padx=10, pady=15)
Label(wind_frame, text="💨", font=("Segoe UI", 20), bg="#f5f5f5").pack()
wind_value = Label(wind_frame, text="", font=("Segoe UI", 16, "bold"), bg="#f5f5f5", fg="#3498db")
wind_value.pack()
Label(wind_frame, text="Wind (m/s)", font=("Segoe UI", 9), bg="#f5f5f5", fg="#666").pack()

# Pressure
pressure_frame = Frame(details_frame, bg="#f5f5f5")
pressure_frame.pack(side=LEFT, expand=True, padx=10, pady=15)
Label(pressure_frame, text="🌡", font=("Segoe UI", 20), bg="#f5f5f5").pack()
pressure_value = Label(pressure_frame, text="", font=("Segoe UI", 16, "bold"), bg="#f5f5f5", fg="#3498db")
pressure_value.pack()
Label(pressure_frame, text="Pressure (hPa)", font=("Segoe UI", 9), bg="#f5f5f5", fg="#666").pack()

root.mainloop()
