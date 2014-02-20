require 'socket'

s = TCPSocket.new 'localhost', 8080
puts "socket opened."

sleep 0.5
s.write "Message"
puts "wrote message"

sleep 0.5
s.close
puts "socket closed"

