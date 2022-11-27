dertmetre=input("Derdinizi 10 üzerinden puanlayınız: ")
isim=input("İsminizi Öğrenebilir miyim? :")

print("Sayın,", isim)

if dertmetre == "0":
    print("""
    Maşallah keşke herkes sizin gibi olsa!
    """)

elif dertmetre >= "5":
      print("""
      Size Önerim:
       Müzeyyen Senar-Bir İhtimal Daha Var.
      """)

elif dertmetre == "10":
    print("""
    Size Önerim:
     Müslüm Gürses-Hasret Rüzgarları. 
    """)

elif dertmetre  < "0":
    print("""
    Kendinize Gelmenizi Rica Ederim.
    Ciddi Bir Programın İçindesiniz.
    """)

elif dertmetre  <  "5":
   print(""" 
   Size Önerim:
    Hakan Altun-Hani Bekleyecektin.
    """)

elif dertmetre <"10":
    print("""
      Size Önerim:
       Müzeyyen Senar-Bir İhtimal Daha Var.
      """)

else:
    print("""
    Kendinize Gelmenizi Rica Ederim.
    Ciddi Bir Programın İçindesiniz.
    """)