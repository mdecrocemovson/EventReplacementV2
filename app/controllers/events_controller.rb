require 'pry'

class EventsController < ApplicationController
  def index
    @events = Event.all
    render json: @events
  end

  def create
    @event = Event.create!(event_params)
    render json: @event
  end

  def show
    @event = Event.find(params[:id])
    render json: @event
  end

  def event_params 
    params.require(:event).permit(:eventName, :eventOwner, :eventLocation, :eventDescription)
  end
end
