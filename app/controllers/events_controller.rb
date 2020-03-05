require 'pry'
class EventsController < ApplicationController
  def index
    response.headers["Access-Control-Allow-Methods"] = "GET, PUT, POST, DELETE"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type, X-Requested-With, Accept"
    binding.pry
    events = Event.all
    binding.pry
    render json: events
  end

  def create
    event = Event.create!(event_params)
  end

  def show
    @event = Event.find(params[:id])
  end

  def event_params 
    params.require(:event).permit(:date, :title, :owner)
  end
end
