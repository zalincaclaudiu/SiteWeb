import socket
import os
import io
import thread

def client(clientsocket):
    cerere=''
    linieDeStart=''
    while True:
        data=clientsocket.recv(1024)
        cerere=cerere+data.decode()
        if(cerere=="\n"):
            break
        print 'S-a citit mesajul: \n -----------------------' + cerere+'\n ---------------'
        pozitie=cerere.find('\r\n')
        if(pozitie>-1):
            linieDeStart=cerere[0:pozitie]
            print 'S-a citit linia de start din cerere: #####' + linieDeStart + '#####'
            break
    print 'S-a terminat citirea.'

    x=linieDeStart.split()
    
    resursa=x[1]
    raspuns=''
    header=''
    
    if(os.path.exists('../continut'+resursa) and os.path.isfile('../continut'+resursa)):
        
        tip=resursa.split(".")[1]
        print(tip)
        if(tip=="html" or tip=="css" or tip=="png" or tip=="gif"):
            tip="text/"+tip
        elif(tip=="js"):
            tip="application/js"
        elif(tip=="jpg" or tip=="jpeg"):
            tip="image/jpeg"
        elif(tip=="ico"):
            tip="image/x-icon"    
        with io.open('../continut'+resursa,"rb") as f: outputdata=f.read()
        linieStartRasp='HTTP/1.1 200 OK \r\n'
        ContentLength='Content-Length: '+str(len(outputdata))+'\r\n'
        ContentType='Content-Type: '+tip+'; charset=UTF-8\r\n'
        #ContentEncoding='Content-Encoding:gzip\r\n'
        Server='Server: Apache\r\n'
        Connection='Connection: keep-alive'
        header+=linieStartRasp+ContentLength+ContentType+Server+'\r\n'
        raspuns+=header.encode('UTF-8')+outputdata+'\r\n'
        clientsocket.sendall(raspuns)    
    else:
        header=''
        linieStartRasp='HTTP/1.1 404 Not Found \r\n'
        ContentLength='Content-Length: 0\r\n'
        ContentType='Content-Type: text/plain; charset=UTF-8\r\n'
        #ContentEncoding='Content-Encoding:deflate\r\n'
        Server='Server: Apache\r\n'
        header+=linieStartRasp+ContentLength+ContentType+Server+'\r\n'
        raspuns+=header.encode('UTF-8')
        clientsocket.sendall(raspuns)
    clientsocket.close()
    print 'S-a terminat comunicarea cu clientul'


serversocket=socket.socket(socket.AF_INET,socket.SOCK_STREAM)
serversocket.bind(('',5678))
serversocket.listen(5)
 

while True:
    print '############################'
    print 'Serverul asculta potentiali clienti'

    (clientsocket,address)=serversocket.accept()
    print 'S-a conectat un client'

    try:
        thread.start_new_thread(client,(clientsocket,))
    except:
        print "Error: unable to start thread"