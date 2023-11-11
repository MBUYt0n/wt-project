f = open("file.txt", "r")
a = f.read()
a = a.split("\n")
s = []
for i in a:
    i = i + "<br/>"
    s.append(i)

s = "".join(s)
print(s)
